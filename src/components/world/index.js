/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */

const countrysEveris = [
  {
    countryE: 'Spain',
  },
  {
    countryE: 'Italy',
  },
  {
    countryE: 'Belgium',
  },
  {
    countryE: 'Netherlands',
  },
  {
    countryE: 'Luxembourg',
  },
  {
    countryE: 'Portugal',
  },
  {
    countryE: 'Switzerland',
  },
  {
    countryE: 'Andorra',
  },
  {
    countryE: 'France',
  },
  {
    countryE: 'United Kingdom',
  },
  {
    countryE: 'United States of America',
  },
  {
    countryE: 'Brazil',
  },
  {
    countryE: 'Mexico',
  },
  {
    countryE: 'Peru',
  },
  {
    countryE: 'Colombia',
  },
  {
    countryE: 'Chile',
  },
  {
    countryE: 'Argentina',
  },
];

export default function define(runtime, observer) {
  const bodyId = document.getElementById('body');
  if (bodyId !== undefined) {
    bodyId.style.transition = '0.5s';
    bodyId.style.opacity = '1';
  }
  const main = runtime.module();

  main.variable(observer('canvas')).define('canvas', ['DOM', 'width', 'd3', 'land', 'borders', 'countries', 'mutable name', 'Versor'], async function* (DOM, width, d3, land, borders, countries, $0, Versor) {
    const context = DOM.context2d(400, 400);
    const projection = d3.geoOrthographic().fitExtent([[10, 10], [400 - 10, 400 - 10]], { type: 'Sphere' });
    const path = d3.geoPath(projection, context);

    function render(country) {
      context.clearRect(0, 0, 400, 400);
      context.beginPath();
      path(land);
      context.fillStyle = '#737373';
      context.fill();
      context.beginPath();
      path(country);
      context.fillStyle = '#00A4EF';
      context.fill();
      context.beginPath();
      path(borders);
      context.strokeStyle = '#000000';
      context.lineWidth = 0.5;
      context.stroke();
      context.beginPath();
      path({ type: 'Sphere' });
      context.strokeStyle = '#000';
      context.lineWidth = 1.5;
      context.stroke();
      return context.canvas;
    }
    let p1;
    let p2 = [0, 0];
    let r1;
    let r2 = [0, 0, 0];

    let i = 0;
    for (const cE of countrysEveris) {
      for (const country of countries) {
        if (country.properties.name === cE.countryE) {
          $0.value = country.properties.name;

          yield render(country);

          p1 = p2;
          p2 = d3.geoCentroid(country);

          r1 = r2;
          r2 = [-p2[0], 20 - p2[1], 0];

          const ip = d3.geoInterpolate(p1, p2);
          const iv = Versor.interpolateAngles(r1, r2);

          await d3.transition()
            .duration(1250)
            .tween('render', () => (t) => {
              projection.rotate(iv(t));
              render(country, { type: 'LineString', coordinates: [p1, ip(t)] });
            })
            .transition()
            .tween('render', () => (t) => {
              render(country, { type: 'LineString', coordinates: [ip(t), p2] });
            })
            .end();
        }
      }
      i += 1;
      if (i === countrysEveris.length) {
        if (bodyId !== undefined) {
          bodyId.style.transition = '0.5s';
          bodyId.style.opacity = '0';
          setTimeout(function () {
            bodyId.innerHTML = '';
            define(runtime, observer);
          }, 1500);
        }
      }
    }
  });
  main.variable(observer('Versor')).define('Versor', function () {
    return (
      class Versor {
        static fromAngles([l, p, g]) {
          l *= Math.PI / 360;
          p *= Math.PI / 360;
          g *= Math.PI / 360;
          const sl = Math.sin(l);
          const cl = Math.cos(l);
          const sp = Math.sin(p);
          const cp = Math.cos(p);
          const sg = Math.sin(g);
          const cg = Math.cos(g);
          return [
            cl * cp * cg + sl * sp * sg,
            sl * cp * cg - cl * sp * sg,
            cl * sp * cg + sl * cp * sg,
            cl * cp * sg - sl * sp * cg,
          ];
        }

        static toAngles([a, b, c, d]) {
          return [
            Math.atan2(2 * (a * b + c * d), 1 - 2 * (b * b + c * c)) * 180 / Math.PI,
            Math.asin(Math.max(-1, Math.min(1, 2 * (a * c - d * b)))) * 180 / Math.PI,
            Math.atan2(2 * (a * d + b * c), 1 - 2 * (c * c + d * d)) * 180 / Math.PI,
          ];
        }

        static interpolateAngles(a, b) {
          const i = Versor.interpolate(Versor.fromAngles(a), Versor.fromAngles(b));
          return (t) => Versor.toAngles(i(t));
        }

        static interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]) {
          a2 -= a1;
          b2 -= b1;
          c2 -= c1;
          d2 -= d1;
          const x = new Array(4);
          return (t) => {
            const l = Math.hypot(x[0] = a1 + a2 * t, x[1] = b1 + b2 * t, x[2] = c1 + c2 * t, x[3] = d1 + d2 * t);
            x[0] /= l, x[1] /= l, x[2] /= l, x[3] /= l;
            return x;
          };
        }

        static interpolate([a1, b1, c1, d1], [a2, b2, c2, d2]) {
          let dot = a1 * a2 + b1 * b2 + c1 * c2 + d1 * d2;
          if (dot < 0) a2 = -a2, b2 = -b2, c2 = -c2, d2 = -d2, dot = -dot;
          if (dot > 0.9995) return Versor.interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]);
          const theta0 = Math.acos(Math.max(-1, Math.min(1, dot)));
          const x = new Array(4);
          const l = Math.hypot(a2 -= a1 * dot, b2 -= b1 * dot, c2 -= c1 * dot, d2 -= d1 * dot);
          a2 /= l, b2 /= l, c2 /= l, d2 /= l;
          return (t) => {
            const theta = theta0 * t;
            const s = Math.sin(theta);
            const c = Math.cos(theta);
            x[0] = a1 * c + a2 * s;
            x[1] = b1 * c + b2 * s;
            x[2] = c1 * c + c2 * s;
            x[3] = d1 * c + d2 * s;
            return x;
          };
        }
      }
    );
  });

  main.define('initial name', function () {
    return (
      ''
    );
  });

  main.variable(observer('mutable name')).define('mutable name', ['Mutable', 'initial name'], (M, _) => new M(_));

  main.variable(observer('name')).define('name', ['mutable name'], (_) => _.generator);

  main.variable(observer('countries')).define('countries', ['topojson', 'world'], function (topojson, world) {
    return (
      topojson.feature(world, world.objects.countries).features
    );
  });

  main.variable(observer('borders')).define('borders', ['topojson', 'world'], function (topojson, world) {
    return (
      topojson.mesh(world, world.objects.countries, (a, b) => a !== b)
    );
  });
  main.variable(observer('land')).define('land', ['topojson', 'world'], function (topojson, world) {
    return (
      topojson.feature(world, world.objects.land)
    );
  });

  main.variable(observer('world')).define('world', ['d3'], function (d3) {
    return (
      d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    );
  });

  main.variable(observer('topojson')).define('topojson', ['require'], function (require) {
    return (
      require('topojson-client@3')
    );
  });

  return main;
}
