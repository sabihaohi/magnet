import zim from "https://zimjs.org/cdn/016/zim";

const { Frame, Container, Rectangle } = zim;

const frame = new Frame(FIT, 1920, 1080, "#eff");

frame.on("ready", ()=>{

    // Create Fixed Magnet
    const fixedMagnet = new Container(240, 120);
    const fixedMagnetN = new Rectangle(120, 120, "red");
    const fixedMagnetS = new Rectangle(120, 120, "blue");
    fixedMagnetS.x=120;

   const fixlabelN= new Label({text: "N", color: "white", bold: true}).center(fixedMagnetN).mov(-20).rot(90);
   fixlabelN.y=45;
   fixlabelN.x=60;

    const fixlabelS=new Label({text: "S", color: "white", bold: true}).center(fixedMagnetS).mov(20).rot(-90);
    fixlabelS.y=70;
    fixlabelS.x=60;


    fixedMagnet.addChild(fixedMagnetN, fixedMagnetS);
    fixedMagnet.centerReg();


    // Create Draggable Magnet
    const dragMagnet = new Container(240, 120);
    const dragMagnetN = new Rectangle(120, 120, "red");
    const dragMagnetS = new Rectangle(120, 120, "blue");
    dragMagnetS.x=120;

    const draglabelN = new Label({text: "N", color: "white", bold: true}).center(dragMagnetN).rot(90);
    draglabelN.y=45;
    draglabelN.x=60;
    const draglabels= new Label({text: "S", color: "white", bold: true}).center(dragMagnetS).rot(-90);
    draglabels.y=70;
    draglabels.x=60;


    

    dragMagnet.addChild(dragMagnetN, dragMagnetS);
    dragMagnet.centerReg().pos(0).drag({all:true});

    // Draggable Magnet Flip
   const btn =  new Button({
    label: "Flip",
    width: 80,
    height: 50,
    backgroundColor: "grey",
    }).centerReg();;
  


    let isFlipped = false;
    dragMagnet.on("pressup", updateMagnets);

    btn.on("click",()=>{
       isFlipped = isFlipped?false:true;
       dragMagnet.animate({
                target: dragMagnet,
                rotation: dragMagnet.rotation - 180,
                time: 0.1,
                ease: "linear", 
       });
       updateMagnets();

    });
    zim.Ticker.add(()=>{
        btn.x=dragMagnet.x;
        btn.y=dragMagnet.y;
        S.addChild(btn);

    })

    


    // function flipDragMagnet(){

    //     isFlipped = isFlipped ? false : true;
    //     animate(dragMagnet, {
    //         target: dragMagnet,
    //         rotation: dragMagnet.rotation - 180,
    //         time: 0.1,
    //         ease: "linear",
    //         call: updateMagnets,
    //     });
    //     btn.animate({
    //         target: btn,
    //         rotation: btn.rotation - 180,
    //         time: 0.1,
    //         ease: "linear",
    //         call: updateMagnets,
    //     });





    //     // if(isFlipped ==false){
    //     //     isFlipped = true;
    //     //     dragMagnetN.animate({
    //     //         props: { x: 120 },
    //     //         time: 1,
    //     //         ease: "linear"
    //     //     });
    //     //     dragMagnetS.animate({
    //     //         props: { x: 0 },
    //     //         time: 1,
    //     //         ease: "linear"
    //     //     });

    //     // }
    //     // else{
    //     //     isFlipped = false;
    //     //     dragMagnetN.animate({
    //     //         props: { x: 0 },
    //     //         time: 1,
    //     //         ease: "linear"
    //     //     });
    //     //     dragMagnetS.animate({
    //     //         props: { x: 120 },
    //     //         time: 1,
    //     //         ease: "linear"
    //     //     });
    //     // }


      
    //    // updateMagnets();
    
    // }
    

    function updateMagnets(){
        let nnDis, nsDis, snDis, ssDis;
        nnDis = zim.dist(dragMagnet.x-60, dragMagnet.y, fixedMagnet.x-60, fixedMagnet.y)-120;
        nsDis = zim.dist(dragMagnet.x-60, dragMagnet.y, fixedMagnet.x+60, fixedMagnet.y)-120;
        snDis = zim.dist(dragMagnet.x+60, dragMagnet.y, fixedMagnet.x-60, fixedMagnet.y)-120;
        ssDis = zim.dist(dragMagnet.x+60, dragMagnet.y, fixedMagnet.x+60, fixedMagnet.y)-120;
        

        if(isFlipped){
            // NN to SN
            let temp = nnDis;
            nnDis = snDis;
            snDis = temp;

            // NS to SS
            temp = nsDis;
            nsDis = ssDis;
            ssDis = temp;
        }
        let minDis = Math.min(nnDis, nsDis, snDis, ssDis);
        
        if(minDis <= 250){
            if(minDis === nnDis){
                let angle = zim.angle(dragMagnet.x-60, dragMagnet.y, fixedMagnet.x+60, fixedMagnet.y);
                zog("Min", minDis, "NN", angle);
                repulsionNN(angle);

            }
            else if(minDis === nsDis){
                let angle = zim.angle(dragMagnet.x-60, dragMagnet.y, fixedMagnet.x+60, fixedMagnet.y);
                zog("Min", minDis, "NS", angle);
                attractionNS(angle);

            }
            else if(minDis === snDis){
                let angle = zim.angle(dragMagnet.x+60, dragMagnet.y, fixedMagnet.x-60, fixedMagnet.y)
                zog("Min", minDis, "SN", angle);
                attractionSN(angle);
                
            }
            else{
                let angle = zim.angle(dragMagnet.x+60, dragMagnet.y, fixedMagnet.x+60, fixedMagnet.y);
                zog("Min", minDis, "SS", angle);
                repulsionSS(angle);
            }
        }
    }

    function repulsionNN(angle){
        if(angle >= 0 && angle <= 20 || angle <= 360 && angle >= 335){
            dragMagnet.animate({
                target: dragMagnet,
                props: {x:dragMagnet.x-300, y:dragMagnet.y},
                time: 0.2,
                ease: "quadOut",
            });
        }
        else if(angle > 20 && angle <= 80){
            dragMagnet.animate({
                target: dragMagnet,
                props: {x:dragMagnet.x, y:dragMagnet.y-200},
                time: 0.2,
                ease: "quadOut",
            });
        }
        else if(angle >= 285 && angle < 335){
            dragMagnet.animate({
                target: dragMagnet,
                props: {x:dragMagnet.x, y:dragMagnet.y+200},
                time: 0.2,
                ease: "quadOut",
            });
        }
    }

    function repulsionSS(angle){
        if(angle <= 215 && angle >= 145){
            dragMagnet.animate({
                target: dragMagnet,
                props: {x:dragMagnet.x+300, y:dragMagnet.y},
                time: 0.2,
                ease: "quadOut",
            });
        }
        else if(angle >= 105 && angle <= 145){
            dragMagnet.animate({
                target: dragMagnet,
                props: {x:dragMagnet.x, y:dragMagnet.y-200},
                time: 0.2,
                ease: "quadOut",
            });
        }
        else if(angle >= 215 && angle < 265){
            dragMagnet.animate({
                target: dragMagnet,
                props: {x:dragMagnet.x, y:dragMagnet.y+200},
                time: 0.2,
                ease: "quadOut",
            });
        }
    }

    function attractionSN(angle){
        if(angle >=0 && angle <=45 || angle <= 360 && angle >= 315){
            dragMagnet.animate({
                target: dragMagnet,
                props: {x:fixedMagnet.x-240, y:fixedMagnet.y},
                time: 0.2,
                ease: "quadOut",
            });
        }
        else if(angle >=45 && angle <=105){
            dragMagnet.animate({
                target: dragMagnet,
                props: {x:fixedMagnet.x-120, y:fixedMagnet.y-120},
                time: 0.2,
                ease: "quadOut",
            });
        }
        else if(angle >=250 && angle < 315){
            dragMagnet.animate({
                target: dragMagnet,
                props: {x:fixedMagnet.x-120, y:fixedMagnet.y+120},
                time: 0.2,
                ease: "quadOut",
            });
        }
    }

    function attractionNS(angle){
        if(angle >=180 && angle <= 225 || angle <= 180 && angle >= 135){
            dragMagnet.animate({
                target: dragMagnet,
                props: {x:fixedMagnet.x+240, y:fixedMagnet.y},
                time: 0.2,
                ease: "quadOut",
            });
        }
        else if(angle >= 70 && angle < 135){
            dragMagnet.animate({
                target: dragMagnet,
                props: {x:fixedMagnet.x+120, y:fixedMagnet.y-120},
                time: 0.2,
                ease: "quadOut",
            });
        }
        else if(angle > 225 && angle < 285){
            dragMagnet.animate({
                target: dragMagnet,
                props: {x:fixedMagnet.x+120, y:fixedMagnet.y+120},
                time: 0.2,
                ease: "quadOut",
            });
        }
        else if(angle < 70){
            dragMagnet.animate({
                target: dragMagnet,
                props: {x:fixedMagnet.x, y:fixedMagnet.y-120},
                time: 0.2,
                ease: "quadOut",
            });
        }
        else if(angle > 280){
            dragMagnet.animate({
                target: dragMagnet,
                props: {x:fixedMagnet.x, y:fixedMagnet.y+120},
                time: 0.2,
                ease: "quadOut",
            });
        }
    }
});

