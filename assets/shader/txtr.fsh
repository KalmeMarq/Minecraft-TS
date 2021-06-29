#version 300 es

precision highp float;

uniform sampler2D u_texture;
uniform vec4 u_color;
in vec2 v_texcoord;

out vec4 fragColor;

void main() {
  fragColor = texture(u_texture, v_texcoord) * u_color;
}