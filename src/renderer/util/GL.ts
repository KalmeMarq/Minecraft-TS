let canvas = document.createElement('canvas')
let gl = canvas.getContext('webgl2') as WebGL2RenderingContext

export function useContext(context: WebGL2RenderingContext): void {
  gl = context
}

export function glBindTexture(target: number, texture: WebGLTexture | null): void {
  gl.bindTexture(target, texture)
}

export function glTexParameteri(target: number, pname: number, param: number): void {
  gl.texParameteri(target, pname, param)
}

export let GL_ACTIVE_UNIFORM_BLOCKS: GLenum = gl.ACTIVE_UNIFORM_BLOCKS
export let GL_ALREADY_SIGNALED: GLenum = gl.ALREADY_SIGNALED
export let GL_ANY_SAMPLES_PASSED: GLenum = gl.ANY_SAMPLES_PASSED
export let GL_ANY_SAMPLES_PASSED_CONSERVATIVE: GLenum = gl.ANY_SAMPLES_PASSED_CONSERVATIVE
export let GL_COLOR: GLenum = gl.COLOR
export let GL_COLOR_ATTACHMENT1: GLenum = gl.COLOR_ATTACHMENT1
export let GL_COLOR_ATTACHMENT10: GLenum = gl.COLOR_ATTACHMENT10
export let GL_COLOR_ATTACHMENT11: GLenum = gl.COLOR_ATTACHMENT11
export let GL_COLOR_ATTACHMENT12: GLenum = gl.COLOR_ATTACHMENT12
export let GL_COLOR_ATTACHMENT13: GLenum = gl.COLOR_ATTACHMENT13
export let GL_COLOR_ATTACHMENT14: GLenum = gl.COLOR_ATTACHMENT14
export let GL_COLOR_ATTACHMENT15: GLenum = gl.COLOR_ATTACHMENT15
export let GL_COLOR_ATTACHMENT2: GLenum = gl.COLOR_ATTACHMENT2
export let GL_COLOR_ATTACHMENT3: GLenum = gl.COLOR_ATTACHMENT3
export let GL_COLOR_ATTACHMENT4: GLenum = gl.COLOR_ATTACHMENT4
export let GL_COLOR_ATTACHMENT5: GLenum = gl.COLOR_ATTACHMENT5
export let GL_COLOR_ATTACHMENT6: GLenum = gl.COLOR_ATTACHMENT6
export let GL_COLOR_ATTACHMENT7: GLenum = gl.COLOR_ATTACHMENT7
export let GL_COLOR_ATTACHMENT8: GLenum = gl.COLOR_ATTACHMENT8
export let GL_COLOR_ATTACHMENT9: GLenum = gl.COLOR_ATTACHMENT9
export let GL_COMPARE_REF_TO_TEXTURE: GLenum = gl.COMPARE_REF_TO_TEXTURE
export let GL_CONDITION_SATISFIED: GLenum = gl.CONDITION_SATISFIED
export let GL_COPY_READ_BUFFER: GLenum = gl.COPY_READ_BUFFER
export let GL_COPY_READ_BUFFER_BINDING: GLenum = gl.COPY_READ_BUFFER_BINDING
export let GL_COPY_WRITE_BUFFER: GLenum = gl.COPY_WRITE_BUFFER
export let GL_COPY_WRITE_BUFFER_BINDING: GLenum = gl.COPY_WRITE_BUFFER_BINDING
export let GL_CURRENT_QUERY: GLenum = gl.CURRENT_QUERY
export let GL_DEPTH: GLenum = gl.DEPTH
export let GL_DEPTH24_STENCIL8: GLenum = gl.DEPTH24_STENCIL8
export let GL_DEPTH32F_STENCIL8: GLenum = gl.DEPTH32F_STENCIL8
export let GL_DEPTH_COMPONENT24: GLenum = gl.DEPTH_COMPONENT24
export let GL_DEPTH_COMPONENT32F: GLenum = gl.DEPTH_COMPONENT32F
export let GL_DRAW_BUFFER0: GLenum = gl.DRAW_BUFFER0
export let GL_DRAW_BUFFER1: GLenum = gl.DRAW_BUFFER1
export let GL_DRAW_BUFFER10: GLenum = gl.DRAW_BUFFER10
export let GL_DRAW_BUFFER11: GLenum = gl.DRAW_BUFFER11
export let GL_DRAW_BUFFER12: GLenum = gl.DRAW_BUFFER12
export let GL_DRAW_BUFFER13: GLenum = gl.DRAW_BUFFER13
export let GL_DRAW_BUFFER14: GLenum = gl.DRAW_BUFFER14
export let GL_DRAW_BUFFER15: GLenum = gl.DRAW_BUFFER15
export let GL_DRAW_BUFFER2: GLenum = gl.DRAW_BUFFER2
export let GL_DRAW_BUFFER3: GLenum = gl.DRAW_BUFFER3
export let GL_DRAW_BUFFER4: GLenum = gl.DRAW_BUFFER4
export let GL_DRAW_BUFFER5: GLenum = gl.DRAW_BUFFER5
export let GL_DRAW_BUFFER6: GLenum = gl.DRAW_BUFFER6
export let GL_DRAW_BUFFER7: GLenum = gl.DRAW_BUFFER7
export let GL_DRAW_BUFFER8: GLenum = gl.DRAW_BUFFER8
export let GL_DRAW_BUFFER9: GLenum = gl.DRAW_BUFFER9
export let GL_DRAW_FRAMEBUFFER: GLenum = gl.DRAW_FRAMEBUFFER
export let GL_DRAW_FRAMEBUFFER_BINDING: GLenum = gl.DRAW_FRAMEBUFFER_BINDING
export let GL_DYNAMIC_COPY: GLenum = gl.DYNAMIC_COPY
export let GL_DYNAMIC_READ: GLenum = gl.DYNAMIC_READ
export let GL_FLOAT_32_UNSIGNED_INT_24_8_REV: GLenum = gl.FLOAT_32_UNSIGNED_INT_24_8_REV
export let GL_FLOAT_MAT2x3: GLenum = gl.FLOAT_MAT2x3
export let GL_FLOAT_MAT2x4: GLenum = gl.FLOAT_MAT2x4
export let GL_FLOAT_MAT3x2: GLenum = gl.FLOAT_MAT3x2
export let GL_FLOAT_MAT3x4: GLenum = gl.FLOAT_MAT3x4
export let GL_FLOAT_MAT4x2: GLenum = gl.FLOAT_MAT4x2
export let GL_FLOAT_MAT4x3: GLenum = gl.FLOAT_MAT4x3
export let GL_FRAGMENT_SHADER_DERIVATIVE_HINT: GLenum = gl.FRAGMENT_SHADER_DERIVATIVE_HINT
export let GL_FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: GLenum = gl.FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE
export let GL_FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: GLenum = gl.FRAMEBUFFER_ATTACHMENT_BLUE_SIZE
export let GL_FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: GLenum = gl.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING
export let GL_FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: GLenum = gl.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE
export let GL_FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: GLenum = gl.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE
export let GL_FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: GLenum = gl.FRAMEBUFFER_ATTACHMENT_GREEN_SIZE
export let GL_FRAMEBUFFER_ATTACHMENT_RED_SIZE: GLenum = gl.FRAMEBUFFER_ATTACHMENT_RED_SIZE
export let GL_FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: GLenum = gl.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE
export let GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: GLenum = gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER
export let GL_FRAMEBUFFER_DEFAULT: GLenum = gl.FRAMEBUFFER_DEFAULT
export let GL_FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: GLenum = gl.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE
export let GL_HALF_FLOAT: GLenum = gl.HALF_FLOAT
export let GL_INTERLEAVED_ATTRIBS: GLenum = gl.INTERLEAVED_ATTRIBS
export let GL_INT_2_10_10_10_REV: GLenum = gl.INT_2_10_10_10_REV
export let GL_INT_SAMPLER_2D: GLenum = gl.INT_SAMPLER_2D
export let GL_INT_SAMPLER_2D_ARRAY: GLenum = gl.INT_SAMPLER_2D_ARRAY
export let GL_INT_SAMPLER_3D: GLenum = gl.INT_SAMPLER_3D
export let GL_INT_SAMPLER_CUBE: GLenum = gl.INT_SAMPLER_CUBE
export let GL_INVALID_INDEX: GLenum = gl.INVALID_INDEX
export let GL_MAX: GLenum = gl.MAX
export let GL_MAX_3D_TEXTURE_SIZE: GLenum = gl.MAX_3D_TEXTURE_SIZE
export let GL_MAX_ARRAY_TEXTURE_LAYERS: GLenum = gl.MAX_ARRAY_TEXTURE_LAYERS
export let GL_MAX_CLIENT_WAIT_TIMEOUT_WEBGL: GLenum = gl.MAX_CLIENT_WAIT_TIMEOUT_WEBGL
export let GL_MAX_COLOR_ATTACHMENTS: GLenum = gl.MAX_COLOR_ATTACHMENTS
export let GL_MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: GLenum = gl.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS
export let GL_MAX_COMBINED_UNIFORM_BLOCKS: GLenum = gl.MAX_COMBINED_UNIFORM_BLOCKS
export let GL_MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: GLenum = gl.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS
export let GL_MAX_DRAW_BUFFERS: GLenum = gl.MAX_DRAW_BUFFERS
export let GL_MAX_ELEMENTS_INDICES: GLenum = gl.MAX_ELEMENTS_INDICES
export let GL_MAX_ELEMENTS_VERTICES: GLenum = gl.MAX_ELEMENTS_VERTICES
export let GL_MAX_ELEMENT_INDEX: GLenum = gl.MAX_ELEMENT_INDEX
export let GL_MAX_FRAGMENT_INPUT_COMPONENTS: GLenum = gl.MAX_FRAGMENT_INPUT_COMPONENTS
export let GL_MAX_FRAGMENT_UNIFORM_BLOCKS: GLenum = gl.MAX_FRAGMENT_UNIFORM_BLOCKS
export let GL_MAX_FRAGMENT_UNIFORM_COMPONENTS: GLenum = gl.MAX_FRAGMENT_UNIFORM_COMPONENTS
export let GL_MAX_PROGRAM_TEXEL_OFFSET: GLenum = gl.MAX_PROGRAM_TEXEL_OFFSET
export let GL_MAX_SAMPLES: GLenum = gl.MAX_SAMPLES
export let GL_MAX_SERVER_WAIT_TIMEOUT: GLenum = gl.MAX_SERVER_WAIT_TIMEOUT
export let GL_MAX_TEXTURE_LOD_BIAS: GLenum = gl.MAX_TEXTURE_LOD_BIAS
export let GL_MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: GLenum = gl.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS
export let GL_MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: GLenum = gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS
export let GL_MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: GLenum = gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS
export let GL_MAX_UNIFORM_BLOCK_SIZE: GLenum = gl.MAX_UNIFORM_BLOCK_SIZE
export let GL_MAX_UNIFORM_BUFFER_BINDINGS: GLenum = gl.MAX_UNIFORM_BUFFER_BINDINGS
export let GL_MAX_VARYING_COMPONENTS: GLenum = gl.MAX_VARYING_COMPONENTS
export let GL_MAX_VERTEX_OUTPUT_COMPONENTS: GLenum = gl.MAX_VERTEX_OUTPUT_COMPONENTS
export let GL_MAX_VERTEX_UNIFORM_BLOCKS: GLenum = gl.MAX_VERTEX_UNIFORM_BLOCKS
export let GL_MAX_VERTEX_UNIFORM_COMPONENTS: GLenum = gl.MAX_VERTEX_UNIFORM_COMPONENTS
export let GL_MIN: GLenum = gl.MIN
export let GL_MIN_PROGRAM_TEXEL_OFFSET: GLenum = gl.MIN_PROGRAM_TEXEL_OFFSET
export let GL_OBJECT_TYPE: GLenum = gl.OBJECT_TYPE
export let GL_PACK_ROW_LENGTH: GLenum = gl.PACK_ROW_LENGTH
export let GL_PACK_SKIP_PIXELS: GLenum = gl.PACK_SKIP_PIXELS
export let GL_PACK_SKIP_ROWS: GLenum = gl.PACK_SKIP_ROWS
export let GL_PIXEL_PACK_BUFFER: GLenum = gl.PIXEL_PACK_BUFFER
export let GL_PIXEL_PACK_BUFFER_BINDING: GLenum = gl.PIXEL_PACK_BUFFER_BINDING
export let GL_PIXEL_UNPACK_BUFFER: GLenum = gl.PIXEL_UNPACK_BUFFER
export let GL_PIXEL_UNPACK_BUFFER_BINDING: GLenum = gl.PIXEL_UNPACK_BUFFER_BINDING
export let GL_QUERY_RESULT: GLenum = gl.QUERY_RESULT
export let GL_QUERY_RESULT_AVAILABLE: GLenum = gl.QUERY_RESULT_AVAILABLE
export let GL_R11F_G11F_B10F: GLenum = gl.R11F_G11F_B10F
export let GL_R16F: GLenum = gl.R16F
export let GL_R16I: GLenum = gl.R16I
export let GL_R16UI: GLenum = gl.R16UI
export let GL_R32F: GLenum = gl.R32F
export let GL_R32I: GLenum = gl.R32I
export let GL_R32UI: GLenum = gl.R32UI
export let GL_R8: GLenum = gl.R8
export let GL_R8I: GLenum = gl.R8I
export let GL_R8UI: GLenum = gl.R8UI
export let GL_R8_SNORM: GLenum = gl.R8_SNORM
export let GL_RASTERIZER_DISCARD: GLenum = gl.RASTERIZER_DISCARD
export let GL_READ_BUFFER: GLenum = gl.READ_BUFFER
export let GL_READ_FRAMEBUFFER: GLenum = gl.READ_FRAMEBUFFER
export let GL_READ_FRAMEBUFFER_BINDING: GLenum = gl.READ_FRAMEBUFFER_BINDING
export let GL_RED: GLenum = gl.RED
export let GL_RED_INTEGER: GLenum = gl.RED_INTEGER
export let GL_RENDERBUFFER_SAMPLES: GLenum = gl.RENDERBUFFER_SAMPLES
export let GL_RG: GLenum = gl.RG
export let GL_RG16F: GLenum = gl.RG16F
export let GL_RG16I: GLenum = gl.RG16I
export let GL_RG16UI: GLenum = gl.RG16UI
export let GL_RG32F: GLenum = gl.RG32F
export let GL_RG32I: GLenum = gl.RG32I
export let GL_RG32UI: GLenum = gl.RG32UI
export let GL_RG8: GLenum = gl.RG8
export let GL_RG8I: GLenum = gl.RG8I
export let GL_RG8UI: GLenum = gl.RG8UI
export let GL_RG8_SNORM: GLenum = gl.RG8_SNORM
export let GL_RGB10_A2: GLenum = gl.RGB10_A2
export let GL_RGB10_A2UI: GLenum = gl.RGB10_A2UI
export let GL_RGB16F: GLenum = gl.RGB16F
export let GL_RGB16I: GLenum = gl.RGB16I
export let GL_RGB16UI: GLenum = gl.RGB16UI
export let GL_RGB32F: GLenum = gl.RGB32F
export let GL_RGB32I: GLenum = gl.RGB32I
export let GL_RGB32UI: GLenum = gl.RGB32UI
export let GL_RGB8: GLenum = gl.RGB8
export let GL_RGB8I: GLenum = gl.RGB8I
export let GL_RGB8UI: GLenum = gl.RGB8UI
export let GL_RGB8_SNORM: GLenum = gl.RGB8_SNORM
export let GL_RGB9_E5: GLenum = gl.RGB9_E5
export let GL_RGBA16F: GLenum = gl.RGBA16F
export let GL_RGBA16I: GLenum = gl.RGBA16I
export let GL_RGBA16UI: GLenum = gl.RGBA16UI
export let GL_RGBA32F: GLenum = gl.RGBA32F
export let GL_RGBA32I: GLenum = gl.RGBA32I
export let GL_RGBA32UI: GLenum = gl.RGBA32UI
export let GL_RGBA8: GLenum = gl.RGBA8
export let GL_RGBA8I: GLenum = gl.RGBA8I
export let GL_RGBA8UI: GLenum = gl.RGBA8UI
export let GL_RGBA8_SNORM: GLenum = gl.RGBA8_SNORM
export let GL_RGBA_INTEGER: GLenum = gl.RGBA_INTEGER
export let GL_RGB_INTEGER: GLenum = gl.RGB_INTEGER
export let GL_RG_INTEGER: GLenum = gl.RG_INTEGER
export let GL_SAMPLER_2D_ARRAY: GLenum = gl.SAMPLER_2D_ARRAY
export let GL_SAMPLER_2D_ARRAY_SHADOW: GLenum = gl.SAMPLER_2D_ARRAY_SHADOW
export let GL_SAMPLER_2D_SHADOW: GLenum = gl.SAMPLER_2D_SHADOW
export let GL_SAMPLER_3D: GLenum = gl.SAMPLER_3D
export let GL_SAMPLER_BINDING: GLenum = gl.SAMPLER_BINDING
export let GL_SAMPLER_CUBE_SHADOW: GLenum = gl.SAMPLER_CUBE_SHADOW
export let GL_SEPARATE_ATTRIBS: GLenum = gl.SEPARATE_ATTRIBS
export let GL_SIGNALED: GLenum = gl.SIGNALED
export let GL_SIGNED_NORMALIZED: GLenum = gl.SIGNED_NORMALIZED
export let GL_SRGB: GLenum = gl.SRGB
export let GL_SRGB8: GLenum = gl.SRGB8
export let GL_SRGB8_ALPHA8: GLenum = gl.SRGB8_ALPHA8
export let GL_STATIC_COPY: GLenum = gl.STATIC_COPY
export let GL_STATIC_READ: GLenum = gl.STATIC_READ
export let GL_STENCIL: GLenum = gl.STENCIL
export let GL_STREAM_COPY: GLenum = gl.STREAM_COPY
export let GL_STREAM_READ: GLenum = gl.STREAM_READ
export let GL_SYNC_CONDITION: GLenum = gl.SYNC_CONDITION
export let GL_SYNC_FENCE: GLenum = gl.SYNC_FENCE
export let GL_SYNC_FLAGS: GLenum = gl.SYNC_FLAGS
export let GL_SYNC_FLUSH_COMMANDS_BIT: GLenum = gl.SYNC_FLUSH_COMMANDS_BIT
export let GL_SYNC_GPU_COMMANDS_COMPLETE: GLenum = gl.SYNC_GPU_COMMANDS_COMPLETE
export let GL_SYNC_STATUS: GLenum = gl.SYNC_STATUS
export let GL_TEXTURE_2D_ARRAY: GLenum = gl.TEXTURE_2D_ARRAY
export let GL_TEXTURE_3D: GLenum = gl.TEXTURE_3D
export let GL_TEXTURE_BASE_LEVEL: GLenum = gl.TEXTURE_BASE_LEVEL
export let GL_TEXTURE_BINDING_2D_ARRAY: GLenum = gl.TEXTURE_BINDING_2D_ARRAY
export let GL_TEXTURE_BINDING_3D: GLenum = gl.TEXTURE_BINDING_3D
export let GL_TEXTURE_COMPARE_FUNC: GLenum = gl.TEXTURE_COMPARE_FUNC
export let GL_TEXTURE_COMPARE_MODE: GLenum = gl.TEXTURE_COMPARE_MODE
export let GL_TEXTURE_IMMUTABLE_FORMAT: GLenum = gl.TEXTURE_IMMUTABLE_FORMAT
export let GL_TEXTURE_IMMUTABLE_LEVELS: GLenum = gl.TEXTURE_IMMUTABLE_LEVELS
export let GL_TEXTURE_MAX_LEVEL: GLenum = gl.TEXTURE_MAX_LEVEL
export let GL_TEXTURE_MAX_LOD: GLenum = gl.TEXTURE_MAX_LOD
export let GL_TEXTURE_MIN_LOD: GLenum = gl.TEXTURE_MIN_LOD
export let GL_TEXTURE_WRAP_R: GLenum = gl.TEXTURE_WRAP_R
export let GL_TIMEOUT_EXPIRED: GLenum = gl.TIMEOUT_EXPIRED
export let GL_TIMEOUT_IGNORED: GLint64 = gl.TIMEOUT_IGNORED
export let GL_TRANSFORM_FEEDBACK: GLenum = gl.TRANSFORM_FEEDBACK
export let GL_TRANSFORM_FEEDBACK_ACTIVE: GLenum = gl.TRANSFORM_FEEDBACK_ACTIVE
export let GL_TRANSFORM_FEEDBACK_BINDING: GLenum = gl.TRANSFORM_FEEDBACK_BINDING
export let GL_TRANSFORM_FEEDBACK_BUFFER: GLenum = gl.TRANSFORM_FEEDBACK_BUFFER
export let GL_TRANSFORM_FEEDBACK_BUFFER_BINDING: GLenum = gl.TRANSFORM_FEEDBACK_BUFFER_BINDING
export let GL_TRANSFORM_FEEDBACK_BUFFER_MODE: GLenum = gl.TRANSFORM_FEEDBACK_BUFFER_MODE
export let GL_TRANSFORM_FEEDBACK_BUFFER_SIZE: GLenum = gl.TRANSFORM_FEEDBACK_BUFFER_SIZE
export let GL_TRANSFORM_FEEDBACK_BUFFER_START: GLenum = gl.TRANSFORM_FEEDBACK_BUFFER_START
export let GL_TRANSFORM_FEEDBACK_PAUSED: GLenum = gl.TRANSFORM_FEEDBACK_PAUSED
export let GL_TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: GLenum = gl.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN
export let GL_TRANSFORM_FEEDBACK_VARYINGS: GLenum = gl.TRANSFORM_FEEDBACK_VARYINGS
export let GL_UNIFORM_ARRAY_STRIDE: GLenum = gl.UNIFORM_ARRAY_STRIDE
export let GL_UNIFORM_BLOCK_ACTIVE_UNIFORMS: GLenum = gl.UNIFORM_BLOCK_ACTIVE_UNIFORMS
export let GL_UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: GLenum = gl.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES
export let GL_UNIFORM_BLOCK_BINDING: GLenum = gl.UNIFORM_BLOCK_BINDING
export let GL_UNIFORM_BLOCK_DATA_SIZE: GLenum = gl.UNIFORM_BLOCK_DATA_SIZE
export let GL_UNIFORM_BLOCK_INDEX: GLenum = gl.UNIFORM_BLOCK_INDEX
export let GL_UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: GLenum = gl.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER
export let GL_UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: GLenum = gl.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER
export let GL_UNIFORM_BUFFER: GLenum = gl.UNIFORM_BUFFER
export let GL_UNIFORM_BUFFER_BINDING: GLenum = gl.UNIFORM_BUFFER_BINDING
export let GL_UNIFORM_BUFFER_OFFSET_ALIGNMENT: GLenum = gl.UNIFORM_BUFFER_OFFSET_ALIGNMENT
export let GL_UNIFORM_BUFFER_SIZE: GLenum = gl.UNIFORM_BUFFER_SIZE
export let GL_UNIFORM_BUFFER_START: GLenum = gl.UNIFORM_BUFFER_START
export let GL_UNIFORM_IS_ROW_MAJOR: GLenum = gl.UNIFORM_IS_ROW_MAJOR
export let GL_UNIFORM_MATRIX_STRIDE: GLenum = gl.UNIFORM_MATRIX_STRIDE
export let GL_UNIFORM_OFFSET: GLenum = gl.UNIFORM_OFFSET
export let GL_UNIFORM_SIZE: GLenum = gl.UNIFORM_SIZE
export let GL_UNIFORM_TYPE: GLenum = gl.UNIFORM_TYPE
export let GL_UNPACK_IMAGE_HEIGHT: GLenum = gl.UNPACK_IMAGE_HEIGHT
export let GL_UNPACK_ROW_LENGTH: GLenum = gl.UNPACK_ROW_LENGTH
export let GL_UNPACK_SKIP_IMAGES: GLenum = gl.UNPACK_SKIP_IMAGES
export let GL_UNPACK_SKIP_PIXELS: GLenum = gl.UNPACK_SKIP_PIXELS
export let GL_UNPACK_SKIP_ROWS: GLenum = gl.UNPACK_SKIP_ROWS
export let GL_UNSIGNALED: GLenum = gl.UNSIGNALED
export let GL_UNSIGNED_INT_10F_11F_11F_REV: GLenum = gl.UNSIGNED_INT_10F_11F_11F_REV
export let GL_UNSIGNED_INT_24_8: GLenum = gl.UNSIGNED_INT_24_8
export let GL_UNSIGNED_INT_2_10_10_10_REV: GLenum = gl.UNSIGNED_INT_2_10_10_10_REV
export let GL_UNSIGNED_INT_5_9_9_9_REV: GLenum = gl.UNSIGNED_INT_5_9_9_9_REV
export let GL_UNSIGNED_INT_SAMPLER_2D: GLenum = gl.UNSIGNED_INT_SAMPLER_2D
export let GL_UNSIGNED_INT_SAMPLER_2D_ARRAY: GLenum = gl.UNSIGNED_INT_SAMPLER_2D_ARRAY
export let GL_UNSIGNED_INT_SAMPLER_3D: GLenum = gl.UNSIGNED_INT_SAMPLER_3D
export let GL_UNSIGNED_INT_SAMPLER_CUBE: GLenum = gl.UNSIGNED_INT_SAMPLER_CUBE
export let GL_UNSIGNED_INT_VEC2: GLenum = gl.UNSIGNED_INT_VEC2
export let GL_UNSIGNED_INT_VEC3: GLenum = gl.UNSIGNED_INT_VEC3
export let GL_UNSIGNED_INT_VEC4: GLenum = gl.UNSIGNED_INT_VEC4
export let GL_UNSIGNED_NORMALIZED: GLenum = gl.UNSIGNED_NORMALIZED
export let GL_VERTEX_ARRAY_BINDING: GLenum = gl.VERTEX_ARRAY_BINDING
export let GL_VERTEX_ATTRIB_ARRAY_DIVISOR: GLenum = gl.VERTEX_ATTRIB_ARRAY_DIVISOR
export let GL_VERTEX_ATTRIB_ARRAY_INTEGER: GLenum = gl.VERTEX_ATTRIB_ARRAY_INTEGER
export let GL_WAIT_FAILED: GLenum = gl.WAIT_FAILED

export let GL_ACTIVE_ATTRIBUTES = gl.ACTIVE_ATTRIBUTES
export let GL_ACTIVE_TEXTURE = gl.ACTIVE_TEXTURE
export let GL_ACTIVE_UNIFORMS = gl.ACTIVE_UNIFORMS
export let GL_ALIASED_LINE_WIDTH_RANGE = gl.ALIASED_LINE_WIDTH_RANGE
export let GL_ALIASED_POINT_SIZE_RANGE = gl.ALIASED_POINT_SIZE_RANGE
export let GL_ALPHA = gl.ALPHA
export let GL_ALPHA_BITS = gl.ALPHA_BITS
export let GL_ALWAYS = gl.ALWAYS
export let GL_ARRAY_BUFFER = gl.ARRAY_BUFFER
export let GL_ARRAY_BUFFER_BINDING = gl.ARRAY_BUFFER_BINDING
export let GL_ATTACHED_SHADERS = gl.ATTACHED_SHADERS
export let GL_BACK = gl.BACK
export let GL_BLEND = gl.BLEND
export let GL_BLEND_COLOR = gl.BLEND_COLOR
export let GL_BLEND_DST_ALPHA = gl.BLEND_DST_ALPHA
export let GL_BLEND_DST_RGB = gl.BLEND_DST_RGB
export let GL_BLEND_EQUATION = gl.BLEND_EQUATION
export let GL_BLEND_EQUATION_ALPHA = gl.BLEND_EQUATION_ALPHA
export let GL_BLEND_EQUATION_RGB = gl.BLEND_EQUATION_RGB
export let GL_BLEND_SRC_ALPHA = gl.BLEND_SRC_ALPHA
export let GL_BLEND_SRC_RGB = gl.BLEND_SRC_RGB
export let GL_BLUE_BITS = gl.BLUE_BITS
export let GL_BOOL = gl.BOOL
export let GL_BOOL_VEC2 = gl.BOOL_VEC2
export let GL_BOOL_VEC3 = gl.BOOL_VEC3
export let GL_BOOL_VEC4 = gl.BOOL_VEC4
export let GL_BROWSER_DEFAULT_WEBGL = gl.BROWSER_DEFAULT_WEBGL
export let GL_BUFFER_SIZE = gl.BUFFER_SIZE
export let GL_BUFFER_USAGE = gl.BUFFER_USAGE
export let GL_BYTE = gl.BYTE
export let GL_CCW = gl.CCW
export let GL_CLAMP_TO_EDGE = gl.CLAMP_TO_EDGE
export let GL_COLOR_ATTACHMENT0 = gl.COLOR_ATTACHMENT0
export let GL_COLOR_BUFFER_BIT = gl.COLOR_BUFFER_BIT
export let GL_COLOR_CLEAR_VALUE = gl.COLOR_CLEAR_VALUE
export let GL_COLOR_WRITEMASK = gl.COLOR_WRITEMASK
export let GL_COMPILE_STATUS = gl.COMPILE_STATUS
export let GL_COMPRESSED_TEXTURE_FORMATS = gl.COMPRESSED_TEXTURE_FORMATS
export let GL_CONTEXT_LOST_WEBGL = gl.CONTEXT_LOST_WEBGL
export let GL_CULL_FACE = gl.CULL_FACE
export let GL_CULL_FACE_MODE = gl.CULL_FACE_MODE
export let GL_CURRENT_PROGRAM = gl.CURRENT_PROGRAM
export let GL_CURRENT_VERTEX_ATTRIB = gl.CURRENT_VERTEX_ATTRIB
export let GL_CW = gl.CW
export let GL_DECR = gl.DECR
export let GL_DECR_WRAP = gl.DECR_WRAP
export let GL_DELETE_STATUS = gl.DELETE_STATUS
export let GL_DEPTH_ATTACHMENT = gl.DEPTH_ATTACHMENT
export let GL_DEPTH_BITS = gl.DEPTH_BITS
export let GL_DEPTH_BUFFER_BIT = gl.DEPTH_BUFFER_BIT
export let GL_DEPTH_CLEAR_VALUE = gl.DEPTH_CLEAR_VALUE
export let GL_DEPTH_COMPONENT = gl.DEPTH_COMPONENT
export let GL_DEPTH_COMPONENT16 = gl.DEPTH_COMPONENT16
export let GL_DEPTH_FUNC = gl.DEPTH_FUNC
export let GL_DEPTH_RANGE = gl.DEPTH_RANGE
export let GL_DEPTH_STENCIL = gl.DEPTH_STENCIL
export let GL_DEPTH_STENCIL_ATTACHMENT = gl.DEPTH_STENCIL_ATTACHMENT
export let GL_DEPTH_TEST = gl.DEPTH_TEST
export let GL_DEPTH_WRITEMASK = gl.DEPTH_WRITEMASK
export let GL_DITHER = gl.DITHER
export let GL_DONT_CARE = gl.DONT_CARE
export let GL_DST_ALPHA = gl.DST_ALPHA
export let GL_DST_COLOR = gl.DST_COLOR
export let GL_DYNAMIC_DRAW = gl.DYNAMIC_DRAW
export let GL_ELEMENT_ARRAY_BUFFER = gl.ELEMENT_ARRAY_BUFFER
export let GL_ELEMENT_ARRAY_BUFFER_BINDING = gl.ELEMENT_ARRAY_BUFFER_BINDING
export let GL_EQUAL = gl.EQUAL
export let GL_FASTEST = gl.FASTEST
export let GL_FLOAT = gl.FLOAT
export let GL_FLOAT_MAT2 = gl.FLOAT_MAT2
export let GL_FLOAT_MAT3 = gl.FLOAT_MAT3
export let GL_FLOAT_MAT4 = gl.FLOAT_MAT4
export let GL_FLOAT_VEC2 = gl.FLOAT_VEC2
export let GL_FLOAT_VEC3 = gl.FLOAT_VEC3
export let GL_FLOAT_VEC4 = gl.FLOAT_VEC4
export let GL_FRAGMENT_SHADER = gl.FRAGMENT_SHADER
export let GL_FRAMEBUFFER = gl.FRAMEBUFFER
export let GL_FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = gl.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME
export let GL_FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = gl.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE
export let GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE
export let GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = gl.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL
export let GL_FRAMEBUFFER_BINDING = gl.FRAMEBUFFER_BINDING
export let GL_FRAMEBUFFER_COMPLETE = gl.FRAMEBUFFER_COMPLETE
export let GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT = gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT
export let GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS = gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS
export let GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT
export let GL_FRAMEBUFFER_UNSUPPORTED = gl.FRAMEBUFFER_UNSUPPORTED
export let GL_FRONT = gl.FRONT
export let GL_FRONT_AND_BACK = gl.FRONT_AND_BACK
export let GL_FRONT_FACE = gl.FRONT_FACE
export let GL_FUNC_ADD = gl.FUNC_ADD
export let GL_FUNC_REVERSE_SUBTRACT = gl.FUNC_REVERSE_SUBTRACT
export let GL_FUNC_SUBTRACT = gl.FUNC_SUBTRACT
export let GL_GENERATE_MIPMAP_HINT = gl.GENERATE_MIPMAP_HINT
export let GL_GEQUAL = gl.GEQUAL
export let GL_GREATER = gl.GREATER
export let GL_GREEN_BITS = gl.GREEN_BITS
export let GL_HIGH_FLOAT = gl.HIGH_FLOAT
export let GL_HIGH_INT = gl.HIGH_INT
export let GL_IMPLEMENTATION_COLOR_READ_FORMAT = gl.IMPLEMENTATION_COLOR_READ_FORMAT
export let GL_IMPLEMENTATION_COLOR_READ_TYPE = gl.IMPLEMENTATION_COLOR_READ_TYPE
export let GL_INCR = gl.INCR
export let GL_INCR_WRAP = gl.INCR_WRAP
export let GL_INT = gl.INT
export let GL_INT_VEC2 = gl.INT_VEC2
export let GL_INT_VEC3 = gl.INT_VEC3
export let GL_INT_VEC4 = gl.INT_VEC4
export let GL_INVALID_ENUM = gl.INVALID_ENUM
export let GL_INVALID_FRAMEBUFFER_OPERATION = gl.INVALID_FRAMEBUFFER_OPERATION
export let GL_INVALID_OPERATION = gl.INVALID_OPERATION
export let GL_INVALID_VALUE = gl.INVALID_VALUE
export let GL_INVERT = gl.INVERT
export let GL_KEEP = gl.KEEP
export let GL_LEQUAL = gl.LEQUAL
export let GL_LESS = gl.LESS
export let GL_LINEAR = gl.LINEAR
export let GL_LINEAR_MIPMAP_LINEAR = gl.LINEAR_MIPMAP_LINEAR
export let GL_LINEAR_MIPMAP_NEAREST = gl.LINEAR_MIPMAP_NEAREST
export let GL_LINES = gl.LINES
export let GL_LINE_LOOP = gl.LINE_LOOP
export let GL_LINE_STRIP = gl.LINE_STRIP
export let GL_LINE_WIDTH = gl.LINE_WIDTH
export let GL_LINK_STATUS = gl.LINK_STATUS
export let GL_LOW_FLOAT = gl.LOW_FLOAT
export let GL_LOW_INT = gl.LOW_INT
export let GL_LUMINANCE = gl.LUMINANCE
export let GL_LUMINANCE_ALPHA = gl.LUMINANCE_ALPHA
export let GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS = gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS
export let GL_MAX_CUBE_MAP_TEXTURE_SIZE = gl.MAX_CUBE_MAP_TEXTURE_SIZE
export let GL_MAX_FRAGMENT_UNIFORM_VECTORS = gl.MAX_FRAGMENT_UNIFORM_VECTORS
export let GL_MAX_RENDERBUFFER_SIZE = gl.MAX_RENDERBUFFER_SIZE
export let GL_MAX_TEXTURE_IMAGE_UNITS = gl.MAX_TEXTURE_IMAGE_UNITS
export let GL_MAX_TEXTURE_SIZE = gl.MAX_TEXTURE_SIZE
export let GL_MAX_VARYING_VECTORS = gl.MAX_VARYING_VECTORS
export let GL_MAX_VERTEX_ATTRIBS = gl.MAX_VERTEX_ATTRIBS
export let GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS = gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS
export let GL_MAX_VERTEX_UNIFORM_VECTORS = gl.MAX_VERTEX_UNIFORM_VECTORS
export let GL_MAX_VIEWPORT_DIMS = gl.MAX_VIEWPORT_DIMS
export let GL_MEDIUM_FLOAT = gl.MEDIUM_FLOAT
export let GL_MEDIUM_INT = gl.MEDIUM_INT
export let GL_MIRRORED_REPEAT = gl.MIRRORED_REPEAT
export let GL_NEAREST = gl.NEAREST
export let GL_NEAREST_MIPMAP_LINEAR = gl.NEAREST_MIPMAP_LINEAR
export let GL_NEAREST_MIPMAP_NEAREST = gl.NEAREST_MIPMAP_NEAREST
export let GL_NEVER = gl.NEVER
export let GL_NICEST = gl.NICEST
export let GL_NONE = gl.NONE
export let GL_NOTEQUAL = gl.NOTEQUAL
export let GL_NO_ERROR = gl.NO_ERROR
export let GL_ONE = gl.ONE
export let GL_ONE_MINUS_CONSTANT_ALPHA = gl.ONE_MINUS_CONSTANT_ALPHA
export let GL_ONE_MINUS_CONSTANT_COLOR = gl.ONE_MINUS_CONSTANT_COLOR
export let GL_ONE_MINUS_DST_ALPHA = gl.ONE_MINUS_DST_ALPHA
export let GL_ONE_MINUS_DST_COLOR = gl.ONE_MINUS_DST_COLOR
export let GL_ONE_MINUS_SRC_ALPHA = gl.ONE_MINUS_SRC_ALPHA
export let GL_ONE_MINUS_SRC_COLOR = gl.ONE_MINUS_SRC_COLOR
export let GL_OUT_OF_MEMORY = gl.OUT_OF_MEMORY
export let GL_PACK_ALIGNMENT = gl.PACK_ALIGNMENT
export let GL_POINTS = gl.POINTS
export let GL_POLYGON_OFFSET_FACTOR = gl.POLYGON_OFFSET_FACTOR
export let GL_POLYGON_OFFSET_FILL = gl.POLYGON_OFFSET_FILL
export let GL_POLYGON_OFFSET_UNITS = gl.POLYGON_OFFSET_UNITS
export let GL_RED_BITS = gl.RED_BITS
export let GL_RENDERBUFFER = gl.RENDERBUFFER
export let GL_RENDERBUFFER_ALPHA_SIZE = gl.RENDERBUFFER_ALPHA_SIZE
export let GL_RENDERBUFFER_BINDING = gl.RENDERBUFFER_BINDING
export let GL_RENDERBUFFER_BLUE_SIZE = gl.RENDERBUFFER_BLUE_SIZE
export let GL_RENDERBUFFER_DEPTH_SIZE = gl.RENDERBUFFER_DEPTH_SIZE
export let GL_RENDERBUFFER_GREEN_SIZE = gl.RENDERBUFFER_GREEN_SIZE
export let GL_RENDERBUFFER_HEIGHT = gl.RENDERBUFFER_HEIGHT
export let GL_RENDERBUFFER_INTERNAL_FORMAT = gl.RENDERBUFFER_INTERNAL_FORMAT
export let GL_RENDERBUFFER_RED_SIZE = gl.RENDERBUFFER_RED_SIZE
export let GL_RENDERBUFFER_STENCIL_SIZE = gl.RENDERBUFFER_STENCIL_SIZE
export let GL_RENDERBUFFER_WIDTH = gl.RENDERBUFFER_WIDTH
export let GL_RENDERER = gl.RENDERER
export let GL_REPEAT = gl.REPEAT
export let GL_REPLACE = gl.REPLACE
export let GL_RGB = gl.RGB
export let GL_RGB565 = gl.RGB565
export let GL_RGB5_A1 = gl.RGB5_A1
export let GL_RGBA = gl.RGBA
export let GL_RGBA4 = gl.RGBA4
export let GL_SAMPLER_2D = gl.SAMPLER_2D
export let GL_SAMPLER_CUBE = gl.SAMPLER_CUBE
export let GL_SAMPLES = gl.SAMPLES
export let GL_SAMPLE_ALPHA_TO_COVERAGE = gl.SAMPLE_ALPHA_TO_COVERAGE
export let GL_SAMPLE_BUFFERS = gl.SAMPLE_BUFFERS
export let GL_SAMPLE_COVERAGE = gl.SAMPLE_COVERAGE
export let GL_SAMPLE_COVERAGE_INVERT = gl.SAMPLE_COVERAGE_INVERT
export let GL_SAMPLE_COVERAGE_VALUE = gl.SAMPLE_COVERAGE_VALUE
export let GL_SCISSOR_BOX = gl.SCISSOR_BOX
export let GL_SCISSOR_TEST = gl.SCISSOR_TEST
export let GL_SHADER_TYPE = gl.SHADER_TYPE
export let GL_SHADING_LANGUAGE_VERSION = gl.SHADING_LANGUAGE_VERSION
export let GL_SHORT = gl.SHORT
export let GL_SRC_ALPHA = gl.SRC_ALPHA
export let GL_SRC_ALPHA_SATURATE = gl.SRC_ALPHA_SATURATE
export let GL_SRC_COLOR = gl.SRC_COLOR
export let GL_STATIC_DRAW = gl.STATIC_DRAW
export let GL_STENCIL_ATTACHMENT = gl.STENCIL_ATTACHMENT
export let GL_STENCIL_BACK_FAIL = gl.STENCIL_BACK_FAIL
export let GL_STENCIL_BACK_FUNC = gl.STENCIL_BACK_FUNC
export let GL_STENCIL_BACK_PASS_DEPTH_FAIL = gl.STENCIL_BACK_PASS_DEPTH_FAIL
export let GL_STENCIL_BACK_PASS_DEPTH_PASS = gl.STENCIL_BACK_PASS_DEPTH_PASS
export let GL_STENCIL_BACK_REF = gl.STENCIL_BACK_REF
export let GL_STENCIL_BACK_VALUE_MASK = gl.STENCIL_BACK_VALUE_MASK
export let GL_STENCIL_BACK_WRITEMASK = gl.STENCIL_BACK_WRITEMASK
export let GL_STENCIL_BITS = gl.STENCIL_BITS
export let GL_STENCIL_BUFFER_BIT = gl.STENCIL_BUFFER_BIT
export let GL_STENCIL_CLEAR_VALUE = gl.STENCIL_CLEAR_VALUE
export let GL_STENCIL_FAIL = gl.STENCIL_FAIL
export let GL_STENCIL_FUNC = gl.STENCIL_FUNC
export let GL_STENCIL_INDEX8 = gl.STENCIL_INDEX8
export let GL_STENCIL_PASS_DEPTH_FAIL = gl.STENCIL_PASS_DEPTH_FAIL
export let GL_STENCIL_PASS_DEPTH_PASS = gl.STENCIL_PASS_DEPTH_PASS
export let GL_STENCIL_REF = gl.STENCIL_REF
export let GL_STENCIL_TEST = gl.STENCIL_TEST
export let GL_STENCIL_VALUE_MASK = gl.STENCIL_VALUE_MASK
export let GL_STENCIL_WRITEMASK = gl.STENCIL_WRITEMASK
export let GL_STREAM_DRAW = gl.STREAM_DRAW
export let GL_SUBPIXEL_BITS = gl.SUBPIXEL_BITS
export let GL_TEXTURE = gl.TEXTURE
export let GL_TEXTURE0 = gl.TEXTURE0
export let GL_TEXTURE1 = gl.TEXTURE1
export let GL_TEXTURE10 = gl.TEXTURE10
export let GL_TEXTURE11 = gl.TEXTURE11
export let GL_TEXTURE12 = gl.TEXTURE12
export let GL_TEXTURE13 = gl.TEXTURE13
export let GL_TEXTURE14 = gl.TEXTURE14
export let GL_TEXTURE15 = gl.TEXTURE15
export let GL_TEXTURE16 = gl.TEXTURE16
export let GL_TEXTURE17 = gl.TEXTURE17
export let GL_TEXTURE18 = gl.TEXTURE18
export let GL_TEXTURE19 = gl.TEXTURE19
export let GL_TEXTURE2 = gl.TEXTURE2
export let GL_TEXTURE20 = gl.TEXTURE20
export let GL_TEXTURE21 = gl.TEXTURE21
export let GL_TEXTURE22 = gl.TEXTURE22
export let GL_TEXTURE23 = gl.TEXTURE23
export let GL_TEXTURE24 = gl.TEXTURE24
export let GL_TEXTURE25 = gl.TEXTURE25
export let GL_TEXTURE26 = gl.TEXTURE26
export let GL_TEXTURE27 = gl.TEXTURE27
export let GL_TEXTURE28 = gl.TEXTURE28
export let GL_TEXTURE29 = gl.TEXTURE29
export let GL_TEXTURE3 = gl.TEXTURE3
export let GL_TEXTURE30 = gl.TEXTURE30
export let GL_TEXTURE31 = gl.TEXTURE31
export let GL_TEXTURE4 = gl.TEXTURE4
export let GL_TEXTURE5 = gl.TEXTURE5
export let GL_TEXTURE6 = gl.TEXTURE6
export let GL_TEXTURE7 = gl.TEXTURE7
export let GL_TEXTURE8 = gl.TEXTURE8
export let GL_TEXTURE9 = gl.TEXTURE9
export let GL_TEXTURE_2D = gl.TEXTURE_2D
export let GL_TEXTURE_BINDING_2D = gl.TEXTURE_BINDING_2D
export let GL_TEXTURE_BINDING_CUBE_MAP = gl.TEXTURE_BINDING_CUBE_MAP
export let GL_TEXTURE_CUBE_MAP = gl.TEXTURE_CUBE_MAP
export let GL_TEXTURE_CUBE_MAP_NEGATIVE_X = gl.TEXTURE_CUBE_MAP_NEGATIVE_X
export let GL_TEXTURE_CUBE_MAP_NEGATIVE_Y = gl.TEXTURE_CUBE_MAP_NEGATIVE_Y
export let GL_TEXTURE_CUBE_MAP_NEGATIVE_Z = gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
export let GL_TEXTURE_CUBE_MAP_POSITIVE_X = gl.TEXTURE_CUBE_MAP_POSITIVE_X
export let GL_TEXTURE_CUBE_MAP_POSITIVE_Y = gl.TEXTURE_CUBE_MAP_POSITIVE_Y
export let GL_TEXTURE_CUBE_MAP_POSITIVE_Z = gl.TEXTURE_CUBE_MAP_POSITIVE_Z
export let GL_TEXTURE_MAG_FILTER = gl.TEXTURE_MAG_FILTER
export let GL_TEXTURE_MIN_FILTER = gl.TEXTURE_MIN_FILTER
export let GL_TEXTURE_WRAP_S = gl.TEXTURE_WRAP_S
export let GL_TEXTURE_WRAP_T = gl.TEXTURE_WRAP_T
export let GL_TRIANGLES = gl.TRIANGLES
export let GL_TRIANGLE_FAN = gl.TRIANGLE_FAN
export let GL_TRIANGLE_STRIP = gl.TRIANGLE_STRIP
export let GL_UNPACK_ALIGNMENT = gl.UNPACK_ALIGNMENT
export let GL_UNPACK_COLORSPACE_CONVERSION_WEBGL = gl.UNPACK_COLORSPACE_CONVERSION_WEBGL
export let GL_UNPACK_FLIP_Y_WEBGL = gl.UNPACK_FLIP_Y_WEBGL
export let GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL = gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL
export let GL_UNSIGNED_BYTE = gl.UNSIGNED_BYTE
export let GL_UNSIGNED_INT = gl.UNSIGNED_INT
export let GL_UNSIGNED_SHORT = gl.UNSIGNED_SHORT
export let GL_UNSIGNED_SHORT_4_4_4_4 = gl.UNSIGNED_SHORT_4_4_4_4
export let GL_UNSIGNED_SHORT_5_5_5_1 = gl.UNSIGNED_SHORT_5_5_5_1
export let GL_UNSIGNED_SHORT_5_6_5 = gl.UNSIGNED_SHORT_5_6_5
export let GL_VALIDATE_STATUS = gl.VALIDATE_STATUS
export let GL_VENDOR = gl.VENDOR
export let GL_VERSION = gl.VERSION
export let GL_VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING
export let GL_VERTEX_ATTRIB_ARRAY_ENABLED = gl.VERTEX_ATTRIB_ARRAY_ENABLED
export let GL_VERTEX_ATTRIB_ARRAY_NORMALIZED = gl.VERTEX_ATTRIB_ARRAY_NORMALIZED
export let GL_VERTEX_ATTRIB_ARRAY_POINTER = gl.VERTEX_ATTRIB_ARRAY_POINTER
export let GL_VERTEX_ATTRIB_ARRAY_SIZE = gl.VERTEX_ATTRIB_ARRAY_SIZE
export let GL_VERTEX_ATTRIB_ARRAY_STRIDE = gl.VERTEX_ATTRIB_ARRAY_STRIDE
export let GL_VERTEX_ATTRIB_ARRAY_TYPE = gl.VERTEX_ATTRIB_ARRAY_TYPE
export let GL_VERTEX_SHADER = gl.VERTEX_SHADER
export let GL_VIEWPORT = gl.VIEWPORT
export let GL_ZERO = gl.ZERO