import circleIcon from '../assets/img/templates/circle.svg'
import dropeyeIcon from '../assets/img/templates/dropeye.svg'
import greenRedSquareIcon from '../assets/img/templates/green-red-square.svg'


export const templates = [
    {
        name: 'Circle',
        value: 'circle',
        icon: circleIcon,
        settings: {
            design: {
                pattern: "circle",
                marker: "circle",
                template: 'circle',
                marker_in: "circle",
            }
        },

    },
    {
        name: 'Drop Eye',
        value: 'dropeye',
        icon: dropeyeIcon,
        settings: {
            design: {
                pattern: "ellipse",
                marker: "dropeye",
                template: 'dropeye',
                marker_in: "dropeye",
            },
            colors: {
                backcolor: "#00ff00",
                frontcolor: "#aeaeae",
                transparent: true,
                gradient: false,
                radial: true,
                gradient_color: "#ffff00",
            },
        },
    },
    {
        name: 'Green Red Square',
        value: 'green-red-square',
        icon: greenRedSquareIcon,
        settings: {
            colors: {
                backcolor: "#00ff00",
                frontcolor: "#aeaeae",
                transparent: true,
                gradient: true,
                radial: true,
                gradient_color: "#ff0000",
            },
            frame: {
                outer_frame: 'top',
                framelabel: 'Scan Me!',
                custom_frame_color: false,
                custom_frame_color: false,
                framecolor: '#000000',
                frame_font: 'Arial, Helvetica, sans-serif'
            }
        }
    }
]