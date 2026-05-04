function smoothStep(a, b, t) {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function length(x, y) {
  return Math.sqrt(x * x + y * y)
}

function roundedRectSDF(x, y, width, height, radius) {
  const qx = Math.abs(x) - width + radius
  const qy = Math.abs(y) - height + radius
  return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius
}

function texture(x, y) {
  return { type: 't', x, y }
}

function generateId() {
  return 'liquid-glass-' + Math.random().toString(36).substr(2, 9)
}

function resolveSize(value, fallback) {
  const next = Math.round(value)
  return Number.isFinite(next) && next > 0 ? next : fallback
}

function defaultFragment(uv) {
  const ix = uv.x - 0.5
  const iy = uv.y - 0.5
  const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6)
  const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15)
  const scaled = smoothStep(0, 1, displacement)
  return texture(ix * scaled + 0.5, iy * scaled + 0.5)
}

const MAX_DISPLACEMENT_SCALE = 48

class Shader {
  constructor(options = {}) {
    this.element = options.element
    if (!this.element) {
      throw new Error('Shader requires a target element')
    }

    const rect = this.element.getBoundingClientRect()
    this.width = resolveSize(options.width || rect.width, 100)
    this.height = resolveSize(options.height || rect.height, 100)
    this.fragment = options.fragment || ((uv) => texture(uv.x, uv.y))
    this.canvasDPI = 1
    this.id = generateId()
    this.mouse = { x: 0, y: 0 }
    this.mouseUsed = false
    this.resizeObserver = null

    this.createElement()
    this.setupEventListeners()
    this.updateShader()
  }

  createElement() {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    this.svg.setAttribute('width', '0')
    this.svg.setAttribute('height', '0')
    this.svg.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9998;
    `

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
    filter.setAttribute('id', `${this.id}_filter`)
    filter.setAttribute('filterUnits', 'userSpaceOnUse')
    filter.setAttribute('colorInterpolationFilters', 'sRGB')
    filter.setAttribute('x', '0')
    filter.setAttribute('y', '0')
    filter.setAttribute('width', this.width.toString())
    filter.setAttribute('height', this.height.toString())

    this.feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage')
    this.feImage.setAttribute('id', `${this.id}_map`)
    this.feImage.setAttribute('width', this.width.toString())
    this.feImage.setAttribute('height', this.height.toString())

    this.feDisplacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap')
    this.feDisplacementMap.setAttribute('in', 'SourceGraphic')
    this.feDisplacementMap.setAttribute('in2', `${this.id}_map`)
    this.feDisplacementMap.setAttribute('xChannelSelector', 'R')
    this.feDisplacementMap.setAttribute('yChannelSelector', 'G')

    filter.appendChild(this.feImage)
    filter.appendChild(this.feDisplacementMap)
    defs.appendChild(filter)
    this.svg.appendChild(defs)

    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width * this.canvasDPI
    this.canvas.height = this.height * this.canvasDPI
    this.canvas.style.display = 'none'
    this.context = this.canvas.getContext('2d')

    this.element.style.backdropFilter =
      `url(#${this.id}_filter) blur(0.25px) contrast(1.2) brightness(1.05) saturate(1.1)`
    this.element.style.webkitBackdropFilter =
      `url(#${this.id}_filter) blur(0.25px) contrast(1.2) brightness(1.05) saturate(1.1)`
    this.element.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.25), 0 -10px 25px inset rgba(0, 0, 0, 0.15)'
    this.element.style.overflow = 'hidden'
  }

  updateSize() {
    const rect = this.element.getBoundingClientRect()
    const nextWidth = resolveSize(rect.width, this.width)
    const nextHeight = resolveSize(rect.height, this.height)
    if (nextWidth === this.width && nextHeight === this.height) {
      return false
    }

    this.width = nextWidth
    this.height = nextHeight
    this.canvas.width = this.width * this.canvasDPI
    this.canvas.height = this.height * this.canvasDPI
    this.feImage.setAttribute('width', this.width.toString())
    this.feImage.setAttribute('height', this.height.toString())
    this.feDisplacementMap.setAttribute('width', this.width.toString())
    this.feDisplacementMap.setAttribute('height', this.height.toString())
    this.svg.querySelector('filter')?.setAttribute('width', this.width.toString())
    this.svg.querySelector('filter')?.setAttribute('height', this.height.toString())
    return true
  }

  setupEventListeners() {
    this.onMouseMove = (e) => {
      const rect = this.element.getBoundingClientRect()
      if (!rect.width || !rect.height) {
        return
      }
      this.mouse.x = (e.clientX - rect.left) / rect.width
      this.mouse.y = (e.clientY - rect.top) / rect.height

      if (this.mouseUsed) {
        this.updateShader()
      }
    }

    this.onResize = () => {
      if (this.updateSize()) {
        this.updateShader()
      }
    }

    document.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('resize', this.onResize)

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.updateSize()) {
          this.updateShader()
        }
      })
      this.resizeObserver.observe(this.element)
    }
  }

  updateShader() {
    const mouseProxy = new Proxy(this.mouse, {
      get: (target, prop) => {
        this.mouseUsed = true
        return target[prop]
      },
    })

    this.mouseUsed = false

    const w = this.width * this.canvasDPI
    const h = this.height * this.canvasDPI
    const data = new Uint8ClampedArray(w * h * 4)

    let maxScale = 0
    const rawValues = []

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % w
      const y = Math.floor(i / 4 / w)
      const pos = this.fragment(
        { x: x / w, y: y / h },
        mouseProxy,
      )
      const dx = x - pos.x * w
      const dy = y - pos.y * h
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy))
      rawValues.push(dx, dy)
    }

    maxScale = Math.min(maxScale * 0.5, MAX_DISPLACEMENT_SCALE)
    if (maxScale <= 0) {
      maxScale = 1
    }

    let index = 0
    for (let i = 0; i < data.length; i += 4) {
      const r = rawValues[index++] / maxScale + 0.5
      const g = rawValues[index++] / maxScale + 0.5
      data[i] = r * 255
      data[i + 1] = g * 255
      data[i + 2] = 0
      data[i + 3] = 255
    }

    this.context.putImageData(new ImageData(data, w, h), 0, 0)
    this.feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.canvas.toDataURL())
    this.feDisplacementMap.setAttribute('scale', (maxScale / this.canvasDPI).toString())
  }

  appendTo(parent) {
    parent.appendChild(this.svg)
  }

  destroy() {
    document.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('resize', this.onResize)
    this.resizeObserver?.disconnect()
    this.svg.remove()
    this.canvas.remove()
  }
}

export function attachLiquidGlass(element) {
  if (!(element instanceof HTMLElement)) {
    return null
  }

  const shader = new Shader({
    element,
    fragment: (uv) => defaultFragment(uv),
  })
  shader.appendTo(document.body)
  return shader
}
