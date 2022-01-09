const particals_data = {
    "particles": {
      "number": {
        "value": 400,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#fff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 1,
          "color": "#0005"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 200,
          "height": 200
        }
      },
      "opacity": {
        "value": .6,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 1,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#fff",
        "opacity": 0,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
   
  }
  // fill-opacity="1"
const svgClip =  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="svgs"><path fill="#c1d9dfd5"  d="M0,320L21.8,277.3C43.6,235,87,149,131,128C174.5,107,218,149,262,176C305.5,203,349,213,393,181.3C436.4,149,480,75,524,64C567.3,53,611,107,655,128C698.2,149,742,139,785,144C829.1,149,873,171,916,197.3C960,224,1004,256,1047,266.7C1090.9,277,1135,267,1178,234.7C1221.8,203,1265,149,1309,149.3C1352.7,149,1396,203,1418,229.3L1440,256L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path></svg>;

export default svgClip;
export {particals_data};