const fs = require('fs')
const path = require('path')

// Create directory structure
const dirs = [
  'public/assets/meshes',
]

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
})

// Create a minimal valid GLB file
const createMinimalGLB = (filename) => {
  const magic = Buffer.from('glTF', 'ascii')
  const version = Buffer.alloc(4)
  version.writeUInt32LE(2, 0)
  
  const jsonScene = {
    asset: { version: "2.0" },
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0 }],
    meshes: [{
      primitives: [{
        attributes: { POSITION: 0 },
        indices: 1
      }]
    }],
    accessors: [
      {
        bufferView: 0,
        componentType: 5126,
        count: 8,
        type: "VEC3",
        max: [1, 1, 1],
        min: [-1, -1, -1]
      },
      {
        bufferView: 1,
        componentType: 5123,
        count: 36,
        type: "SCALAR"
      }
    ],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: 96 },
      { buffer: 0, byteOffset: 96, byteLength: 72 }
    ],
    buffers: [{ byteLength: 168 }]
  }
  
  const jsonString = JSON.stringify(jsonScene)
  const jsonBuffer = Buffer.from(jsonString, 'utf8')
  const jsonPadding = (4 - (jsonBuffer.length % 4)) % 4
  const jsonChunk = Buffer.concat([
    Buffer.alloc(4),
    Buffer.from('JSON', 'ascii'),
    jsonBuffer,
    Buffer.alloc(jsonPadding)
  ])
  jsonChunk.writeUInt32LE(jsonChunk.length - 8, 0)
  
  const vertices = new Float32Array([
    -1, -1, -1,  1, -1, -1,  1, 1, -1,  -1, 1, -1,
    -1, -1,  1,  1, -1,  1,  1, 1,  1,  -1, 1,  1
  ])
  const indices = new Uint16Array([
    0, 1, 2,  2, 3, 0,  4, 7, 6,  6, 5, 4,
    0, 4, 5,  5, 1, 0,  2, 6, 7,  7, 3, 2,
    0, 3, 7,  7, 4, 0,  1, 5, 6,  6, 2, 1
  ])
  
  const verticesBuffer = Buffer.from(vertices.buffer, vertices.byteOffset, vertices.byteLength)
  const indicesBuffer = Buffer.from(indices.buffer, indices.byteOffset, indices.byteLength)
  const binaryData = Buffer.concat([verticesBuffer, indicesBuffer])
  const binaryPadding = (4 - (binaryData.length % 4)) % 4
  const binaryChunkLength = 8 + binaryData.length + binaryPadding
  const binaryChunk = Buffer.concat([
    Buffer.alloc(4),
    Buffer.from('BIN\x00', 'ascii'),
    binaryData,
    Buffer.alloc(binaryPadding)
  ])
  binaryChunk.writeUInt32LE(binaryChunkLength - 8, 0)
  
  const totalLength = 12 + jsonChunk.length + binaryChunk.length
  
  const header = Buffer.concat([
    magic,
    version,
    Buffer.alloc(4)
  ])
  header.writeUInt32LE(totalLength, 8)
  
  const glbFile = Buffer.concat([header, jsonChunk, binaryChunk])
  
  const glbPath = path.join('public/assets/meshes', filename)
  fs.writeFileSync(glbPath, glbFile)
  console.log(`Created GLB: ${filename} (${glbFile.length} bytes)`)
}

// Generate all required GLB files
const generateAssets = () => {
  console.log('Generating GLB assets...\n')
  
  // Base avatars
  createMinimalGLB('base_male.glb')
  createMinimalGLB('base_female.glb')
  
  // Hair options
  createMinimalGLB('hair_01.glb')
  createMinimalGLB('hair_02.glb')
  createMinimalGLB('hair_03.glb')
  createMinimalGLB('hair_04.glb')
  
  // Apparel
  createMinimalGLB('apparel_01.glb')
  createMinimalGLB('apparel_02.glb')
  
  console.log('\n✅ All GLB assets generated!')
  console.log('Note: These are placeholder GLB files with simple box geometry.')
  console.log('Replace them with your actual 3D models when ready.')
}

generateAssets()
