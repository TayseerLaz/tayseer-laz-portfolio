import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.position.z = 5

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const clock = new THREE.Clock()

    // Particles
    const count = 1500
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [
      new THREE.Color(0x8c3839),
      new THREE.Color(0xc45a2d),
      new THREE.Color(0xe8734a),
      new THREE.Color(0xb85456),
      new THREE.Color(0xfbf5ea),
    ]
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Wireframe shapes
    const shapes = [
      { geo: new THREE.IcosahedronGeometry(0.5, 0), pos: [-3, 2, -2] },
      { geo: new THREE.OctahedronGeometry(0.4, 0), pos: [3, -1, -3] },
      { geo: new THREE.TetrahedronGeometry(0.35, 0), pos: [-2, -2, -1] },
      { geo: new THREE.TorusGeometry(0.3, 0.1, 8, 16), pos: [2, 2, -2] },
      { geo: new THREE.DodecahedronGeometry(0.3, 0), pos: [0, -3, -2] },
    ]
    const meshes = shapes.map((s, i) => {
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x8c3839 : 0xc45a2d,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      })
      const mesh = new THREE.Mesh(s.geo, mat)
      mesh.position.set(...s.pos)
      mesh.userData = {
        rx: 0.002 + Math.random() * 0.005,
        ry: 0.003 + Math.random() * 0.005,
        fs: 0.5 + Math.random() * 0.5,
        fo: Math.random() * Math.PI * 2,
        oy: s.pos[1],
      }
      scene.add(mesh)
      return mesh
    })

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      particles.rotation.x = t * 0.05 + mouse.y * 0.3
      particles.rotation.y = t * 0.08 + mouse.x * 0.3

      meshes.forEach(m => {
        const d = m.userData
        m.rotation.x += d.rx
        m.rotation.y += d.ry
        m.position.y = d.oy + Math.sin(t * d.fs + d.fo) * 0.3
      })

      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02
      camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.02
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return <canvas id="bg-canvas" ref={canvasRef} />
}
