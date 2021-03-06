
attribute vec2 anchor, quantity;
attribute vec3 color, next;
uniform vec3 cameraPos, cameraTarget, Geo, Cracking, Itching, Rolling;
uniform vec2 resolution;
uniform float time;
varying vec2 vUV;
varying vec4 vColor;

void main () {

	float size = 0.001;
	float salt = random(quantity.xx);
	size += Itching.y*.005;
	size *= step(.7, salt);

	vec3 pos = position;
	vec3 nxt = next;

	mat2 rr = rot(Rolling.y + quantity.y);

	vec3 offset = normalize(position) * Cracking.y * salt;
	float r = (random(anchor.yy+fract(time))*2.-1.);
	offset *= 1. + smoothstep(.8, .9, abs(anchor.y))*r*.2 * Itching.y*smoothstep(.5, 1., salt);
	pos += offset;
	nxt += offset;

	pos.xy *= rr;
	pos.xz *= rr;
	nxt.xy *= rr;
	nxt.xz *= rr;

	float y = anchor.y * .5 + .5;
	vec4 sPos = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
	vec4 sNxt = projectionMatrix * viewMatrix * modelMatrix * vec4(nxt, 1);
	vec2 forward = normalize(sNxt.xy-sPos.xy);
	vec2 right = vec2(forward.y, -forward.x);
	vec2 zw = mix(sPos.zw, sNxt.zw, y);
	gl_Position = vec4(mix(sPos.xy, sNxt.xy, y) + right * anchor.x * size, zw);

	// pos.xy += anchor * size;
	vColor = vec4(1);

	// gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}
