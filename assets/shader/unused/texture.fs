#version 300 es
 
precision highp float;
uniform vec4 u_color;
out vec4 outColor;

uniform sampler2D u_image;
in vec2 v_texCoord;
 
void main() {
  outColor = texture(u_image, v_texCoord) * u_color;
}