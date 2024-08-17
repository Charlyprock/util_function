
/**
 * Cette fonction permet de redimentionner le balise dans une parge web
 * elle permet de redimentionner soit a la vertical soit a l'horizontal
 * 
 * @param {string} resizeComponent c'est un selecteur css pour l'element qui se redimentionne.
 * @param {string} resizeBar c'est un selecteur css pour la barre de redimentionnement.
 * @param {string} voisin c'est un selecteur css pour l'element qui est affecter par le 
 *                        le redimentionnement de l'autre.
 * @param {string} [direction] la sens du redimentionnement:
 *                  `h: pour horizontal`(valeur par defaut)
 *                  `v: pour vertical`
 * @param {interger} [min_size] c'est la valeur minimale en poucentage que peut prendre resizeComponent
 *                   `0 < min_size > 100` (`0` est la valeur par defaut)
 * @param {interger} [max_size] c'est la valeur maximal en poucentage que peut prendre resizeComponent
 *                   `0 < max_size > 100` (`100` est la valeur par defaut)
 * @param {interger} [delay] c'est le temps en miliseconde que la fonction doit patienter
 *                          avant de recuperer les element dans le dom. (`1000` par defaut)
 * @example 
 * resize(".resize-component-v", ".resize-bar-v", '.voisin-v', "v")
 * resize("#resize-component-v", ".resize-bar-v", 'section', "h", 30, 60)
 */
function resize(resizeComponent, resizeBar, voisin, direction="h", min_size=0, 
                max_size=100, add=2, delay=1000){

    setTimeout(() => {
        
        const bar = document.querySelector(resizeBar);
        const component = document.querySelector(resizeComponent);
        const voi = document.querySelector(voisin);

        let isResizing = false;
        var cursor

        // lorsque j'enfonce le bouton gauche de la sourie
        bar.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isResizing = true;
        });

        // lorsque je bouge la sourie
        document.addEventListener('mousemove', (e) => {
            if (!isResizing){
                return
            }
            
            if (direction == "h") { // pour le deplacement horizontal
                const width = ((e.pageX + add) * 100) / window.innerWidth; // pour de terminer la largeur en pourcentage

                if(width < max_size && width > min_size){
                    component.style.width = `${width}%`
                    voi.style.width = `${100 - width}%`

                    cursor = "e-resize"
                }
                
            } else {  // pour le deplacement vertical
                
                var distance = window.innerHeight - e.pageY
                const height = ((distance + add) * 100) / window.innerHeight; // pour de terminer la largeur en pourcentage

                if (height < max_size && height > min_size) {
                    component.style.height = `${height}%`
                    voi.style.height = `${100 - height}%`

                    cursor = "s-resize"
                }
            }
            component.style.cursor = cursor
            voi.style.cursor = cursor
            
        });

        // lorsque je lache le boutton gauche de la sourie
        document.addEventListener('mouseup', () => {
            if (!isResizing) {
                return
            }
            
            isResizing = false;

            component.style.cursor = "auto"
            voi.style.cursor = "auto"
            
        });
        
    }, delay);
}


/**
 * permet de faire apparaitre un modal lorsqu'on fair un click droit sur un ou plusieur elements de la page
 * 
 * @param {string} selector_modal selecteur css pour le modal qui apparaitra lors du click
 * @param {string} selector_click selecteur css pour l'element sur lequelle le click droit s'applique
 * @param {string} [display] il s'agit de la propriete display du css qui prend tous les attribut disponible (`block` par defaut)
 * @example
 * click_droit(".modal", ".click")
 * click_droit("section .modal", ".click", "flex")
 */
function click_droit(selector_modal, selector_click, display="block"){

    setTimeout(() => {

        var modal = document.querySelector(selector_modal)
        const click = document.querySelectorAll(selector_click);

        var h
        var w

        // pour determiner les dimentions exact du modal
        modal.style.visibility = "hidden"
        modal.style.display = display
        h = modal.offsetHeight
        w = modal.offsetWidth
        modal.style.removeProperty("visibility")
        modal.style.display = "none"

        modal.style.position = "fixed"
        var isOpen = false
        
        
        click.forEach( (element) => {
        
            element.addEventListener("contextmenu", (e) => {
                e.preventDefault()
                isOpen = true

                var reste_x = window.innerWidth - e.clientX
                var reste_y = window.innerHeight - e.clientY

                // le normal: en haut a gauche
                var top = e.clientY
                var left = e.clientX
                
                if (reste_x < w) {  // en haut a droite
                    left = e.clientX - w

                } if (reste_y < h) { // en bas a gauche
                    top = e.clientY - h

                } if ((reste_x < w) && (reste_y < h)) {  // en bas a droite
                    top = e.clientY - h
                    left = e.clientX - w
                }

                if (top < 0) { // dans le cas ou le modal serait plus grand que la moitier de la fenetre
                    top = 0
                }

                modal.style.top = `${top}px`
                modal.style.left = `${left}px`

                modal.style.display = display
                
            });
        })

        document.addEventListener("click", () => {
            if (isOpen) {
                modal.style.display = "none"
            }
        })

    }, 1000);
}




function close_translate(selector, duration=1000, direction="left"){

    var elements = document.querySelectorAll(selector)

    var dir = -1
    var val_x = 100
    var val_y = 0

    if (direction == "top") {
        dir = -1
        val_x = 0
        val_y = 100
    } else if(direction == "rigth"){
        dir = 1
        val_x = 100
        val_y = 0
    } else if(direction == "bottom"){
        dir = 1
        val_x = 0
        val_y = 100
    }

    elements.forEach(element => {
        setTimeout(() => {
            element.style.display = "none"
        }, duration + 5);

        element.style.transition = `${duration}ms`

        element.style.transform = "translate("+ (dir * val_x) +"%, "+ (dir * val_y) +"%)"
    })

    

}

function open_translate(selector, duration=1000, display="block"){

    var element = document.querySelector(selector)

    setTimeout(() => {
        element.style.transition = `${duration}ms`
        element.style.transform = "translate(0,0)"
    }, 10);

    element.style.display = display

}

function close_opacity(selector, duration=1000, opacity=0, delais=5){

    var elements = document.querySelectorAll(selector)

    elements.forEach(element => {
        setTimeout(() => {
        element.style.display = "none"
        }, duration + delais);

        element.style.transition = `${duration}ms`

        element.style.opacity = opacity
    })

    
}

function open_opacity(selector, duration=1000, opacity=1, display="block", delais=5){

    var elements = document.querySelectorAll(selector)

    elements.forEach(element => {
        setTimeout(() => {
        element.style.opacity = opacity
        },delais);

        element.style.display = display
        element.style.transition = `${duration}ms`
    })

}

function close_translate_opacity(selector, duration=1000, direction="left", opacity=0, delais=5){

    var elements = document.querySelectorAll(selector)

    var dir = -1
    var val_x = 100
    var val_y = 0

    if (direction == "top") {
        dir = -1
        val_x = 0
        val_y = 100
    } else if(direction == "rigth"){
        dir = 1
        val_x = 100
        val_y = 0
    } else if(direction == "bottom"){
        dir = 1
        val_x = 0
        val_y = 100
    }

    elements.forEach(element => {
        setTimeout(() => {
            element.style.display = "none"
        }, duration + delais);

        element.style.transition = `${duration}ms`

        element.style.transform = "translate("+ (dir * val_x) +"%, "+ (dir * val_y) +"%)"
        element.style.opacity = opacity
    })

}

function open_translate_opacity(selector, duration=1000, display="block",opacity=1, delais=5){

    var elements = document.querySelectorAll(selector)

    elements.forEach(element => {
        setTimeout(() => {
            element.style.transition = `${duration}ms`
            element.style.transform = "translate(0,0)"
            element.style.opacity = opacity
            
        }, delais);

        element.style.display = display
    })
}

function close_resize(selector, duration=1000, origin="center", delais=5){

    // top  // top right  // top left // top-v
    // bottom  // bottom right // bottom left // bottom-v
    // right  // right-h
    // left   // left-h
    // center  // center-h  // center-v

    var ori = origin.slice(0, origin.length - 2)
    var dir = origin.slice(origin.length - 2, origin.length)

    var x = 0
    var y = 0

    if(dir == "-v") {
        x = 1
    } else if (dir == "-h") {
        y = 1
    } else {
        ori = origin
    }

    // console.log(ori, dir, `(${x}, ${y})`)

    var elements = document.querySelectorAll(selector)

    elements.forEach(element => {

        setTimeout(() => {
            element.style.display = "none"
        }, duration + delais);
        
        element.style.transformOrigin = ori
        element.style.transition = `${duration}ms`
        element.style.transform = `scale(${x}, ${y})`
        
    })

}

function open_resize(selector, duration=1000, display="block", delais=5){

    var elements = document.querySelectorAll(selector)
    
    elements.forEach(element => {
        
        setTimeout(() => {
            element.style.removeProperty("transform")
        },delais);

        element.style.display = display
        element.style.transition = `${duration}ms`
        
    })

}

function iter_obs(fonct, param, selector, visibPencent=0.2){
    // console.log(fonct(...Object.values(param)))

    const option = {
        root :null,
        rootMargin: '0px',
        threshold: visibPencent
    }

    function apparition(entries, observer){

        entries.forEach(function(e){

            if(e.intersectionRatio > visibPencent){
                param.element = e.target
                fonct(param)
                observer.unobserve(e.target)
            }
        })

    }

    const observer = new IntersectionObserver(apparition, option)

    document.querySelectorAll(selector).forEach(function(element){
        observer.observe(element)
    })
}




function deplacement1(selector, time=0){
    var block = document.querySelector(selector)

    var isDepalace = false
    var star_x = 0
    var star_y = 0
    var left = 0
    var top = 0
    var timer

    block.addEventListener("mousedown", (e) => {

        timer = setTimeout(() => {

            isDepalace = true

            left = block.getBoundingClientRect().left
            top = block.getBoundingClientRect().top
            star_x = e.clientX
            star_y = e.clientY
            
            block.style.position = "fixed"
            block.style.top = `${top}px`
            block.style.left = `${left}px`
            console.log("le down", timer);
        }, time);

    })

    
    block.addEventListener("mousemove", (e) => {
        if (!isDepalace) {
            return
        }

        block.style.top = `${top + (e.clientY - star_y)}px`
        block.style.left = `${left + (e.clientX - star_x)}px`
        console.log("le move", timer);
    })

    document.addEventListener("mouseup", () => {
        isDepalace = false
        clearTimeout(timer)
        console.log("le up", timer);
    })

    block.addEventListener("mouseleave", () => {
        isDepalace = false
        clearTimeout(timer)
        console.log("le leave", timer);
    })
    
}

function deplacement2(selector, time=100){
    // par de duration
    // le parent ne doit pas etre en relative
    // 
    // 
    // 


    var blocks = document.querySelectorAll(selector)

    var isDepalace = false
    var star_x = 0
    var star_y = 0
    var left = 0
    var top = 0
    var timer

    for (let index = 0; index < blocks.length; index++) {
        const block = blocks[index];
        
        block.addEventListener("mousedown", (e) => {
            console.log(block);
            timer = setTimeout(() => {
                e.preventDefault()
                isDepalace = true

                left = block.getBoundingClientRect().left
                top = block.getBoundingClientRect().top
                star_x = e.clientX
                star_y = e.clientY
                
                block.style.position = "absolute"
                block.style.top = `${top}px`
                block.style.left = `${left}px`
                console.log("le down", timer);
            }, time);

        })
    

    

    
        block.addEventListener("mousemove", (e) => {
            if (!isDepalace) {
                return
            }
            e.preventDefault()
            block.style.top = `${top + (e.clientY - star_y)}px`
            block.style.left = `${left + (e.clientX - star_x)}px`
            console.log("le move", timer);
        })

        document.addEventListener("mouseup", () => {
            isDepalace = false
            clearTimeout(timer)
            console.log("le up", timer);
        })

        block.addEventListener("mouseleave", () => {
            isDepalace = false
            clearTimeout(timer)
            console.log("le leave", timer);
        })

    }
    
}

function deplacement(selector, time=1000){
    // l'element ne doit pas avoir de duration
    // le parent ne doit pas etre en position relative
    // 
    // 
    // 


    var blocks = document.querySelectorAll(selector)

    var isDepalace = false
    var star_x = 0
    var star_y = 0
    var left = 0
    var top = 0
    var timer

    let closestTarget
    let closestDistance

    blocks.forEach(block => {
        
        block.addEventListener("mousedown", (e) => {

            timer = setTimeout(() => {
                e.preventDefault()
                isDepalace = true

                left = block.getBoundingClientRect().left
                top = block.getBoundingClientRect().top
                star_x = e.clientX
                star_y = e.clientY

                var h = block.offsetHeight
                var w = block.offsetWidth
                
                block.style.position = "fixed"
                block.style.top = `${top}px`
                block.style.left = `${left}px`

                block.style.width = `${w}px`
                block.style.height = `${h}px`
                block.style.userSelect = "none"

                console.log(block)
            }, time);

        })
    


    
        block.addEventListener("mousemove", (e) => {
            if (!isDepalace) {
                return
            }

            // pour ce deplacer
            block.style.top = `${top + (e.clientY - star_y)}px`
            // block.style.left = `${left + (e.clientX - star_x)}px`

            // // Déterminer l'élément cible juste au-dessus
            // const targets = Array.from(blocks)
            // targets.splice(index, 1)

            // closestTarget = null;
            // closestDistance = Infinity;

            // targets.forEach(target => {
            //     const rect = target.getBoundingClientRect();
            //     const distance = Math.abs(rect.top - (block.getBoundingClientRect().bottom));
            //     // if (closestTarget) {
            //     //     closestTarget.style.borderColor = ""
            //     // }
            //     // target.style.borderColor = ""

            //     if (distance < closestDistance) {
            //         closestDistance = distance;
            //         closestTarget = target;
            //         // closestTarget.style.borderColor = "rgb(59 130 246)"
            //     }
                
            //     console.log(rect.top, block.getBoundingClientRect().top, star_x)
            // });
        })

        document.addEventListener("mouseup", (e) => {

            if (isDepalace) {
                // Déterminer l'élément cible juste au-dessus
                const targets = Array.from(document.querySelectorAll(selector))
                // targets.splice(index, 1)

                closestTarget = null;
                closestDistance = Infinity;
                var i = 1

                targets.forEach(target => {
                    const rect = target.getBoundingClientRect();
                    // const distance = Math.abs(rect.top - (block.getBoundingClientRect().bottom));
                    const distance = e.clientY - (rect.top + rect.height)
                    // if (closestTarget) {
                    //     closestTarget.style.borderColor = ""
                    // }
                    // target.style.borderColor = ""

                    if (distance >= 0 && distance < closestDistance) {
                        closestDistance = distance;
                        closestTarget = target;
                        // closestTarget.style.borderColor = "rgb(59 130 246)"
                    }
                    
                    console.log(i, distance, closestDistance, star_x)
                    i++
                });

                if (closestTarget) {
                    closestTarget.insertAdjacentElement('afterend', block);
                    closestTarget.style.backgroundColor = "rgb(59 130 246)"
                    console.log("j'insert...")
                }

            }
            
            block.style.position = "static"
            block.style.removeProperty("width")
            block.style.removeProperty("height")
            block.style.removeProperty("user-select")
            block.classList.add("je-suis-le-boos")

            isDepalace = false
            clearTimeout(timer)
        })

        block.addEventListener("mouseleave", () => {
            isDepalace = false
            clearTimeout(timer)
        })

    })
    
}



module.exports = {
    open_resize,
    open_opacity,
    open_translate,
    open_translate_opacity,
    close_opacity,
    close_resize,
    close_translate,
    close_translate_opacity,
    resize,
    click_droit,
    iter_obs,
    deplacement,
    deplacement1,
    deplacement2,
}