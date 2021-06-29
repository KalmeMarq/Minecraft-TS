#version 300 es

precision highp float;
uniform sampler2D DiffuseSampler;
uniform vec4 ColorModulate;
in vec2 texCoord;
out vec4 fragColor;

void main() {
  fragColor = texture(DiffuseSampler, texCoord) * ColorModulate;
}
