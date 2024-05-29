import zim from "https://zimjs.org/cdn/016/zim";

const { Frame, Container, Rectangle, Label, Button } = zim;

const frame = new Frame("fit", 1920, 1080, "#ddd");
frame.on("ready", () => {

    // fixed magnet
    const fixedMagnet = new Container(240, 100).center();
    const fixedMagnetN = new Triangle(100,100,100, "red")
    const fixedMagnetS = new Triangle(100, 100,120, "blue");
    fixedMagnetS.x = 120;

    new Label({
        text: "N",
        color: "white"
    }).center(fixedMagnetN);

    new Label({
        text: "S",
        color: "white"
    }).center(fixedMagnetS);

    fixedMagnet.addChild(fixedMagnetN, fixedMagnetS);
    fixedMagnet.centerReg();

    

    // draggable magnet.
    const draggableMagnet = new Container(240, 100).center().mov(-500, 0);

    const draggableMagnetN = new Rectangle(120, 100, "red");
    const draggableMagnetS = new Rectangle(120, 100, "blue");
    draggableMagnetS.x = 120;

    new Label({
        text: "N",
        color: "white"
    }).center(draggableMagnetN);

    new Label({
        text: "S",
        color: "white"
    }).center(draggableMagnetS);

    draggableMagnet.addChild(draggableMagnetN, draggableMagnetS);
    draggableMagnet.drag({ all: true });

    // Set registration point of the draggable magnet to its center
    draggableMagnet.regX = draggableMagnet.width / 2;
    draggableMagnet.regY = draggableMagnet.height / 2;

    const updateRotation = () => {

        const distance1 = zim.dist(draggableMagnetN.x + draggableMagnet.x, draggableMagnetN.y + draggableMagnet.y, fixedMagnetS.x + fixedMagnet.x, fixedMagnetS.y + fixedMagnet.y);
        //console.log("distance between draggableMagnetN and fixedMagnetS:", distance1);

        const distance2 = zim.dist(draggableMagnetN.x + draggableMagnet.x,draggableMagnetN.y + draggableMagnet.y, fixedMagnetN.x + fixedMagnet.x,fixedMagnetN.y+ fixedMagnet.y);
        //console.log("distance between draggableMagnetN and fixedMagnetN::",distance2);

        const distance3 = zim.dist(draggableMagnetS.x + draggableMagnet.x,draggableMagnetS.y + draggableMagnet.y, fixedMagnetN.x + fixedMagnet.x,fixedMagnetN.y+ fixedMagnet.y);
        //console.log("distance between draggableMagnetS and fixedMagnetN::",distance3);

        const distance4 = zim.dist(draggableMagnetN.x + draggableMagnet.x,draggableMagnetN.y + draggableMagnet.y, fixedMagnetS.x + fixedMagnet.x,fixedMagnetS.y+ fixedMagnet.y);
        //console.log("distance between draggableMagnetS and fixedMagnetN::",distance4);
        console.log("dn to fs:",distance1,"dn to fN:",distance2,"ds to fs:",distance3,"dn to fs:",distance4);


        const minDistancce = Math.min(distance1,distance2,distance3,distance4)
        console.log("min dis",minDistancce);

        if(distance1<distance2 && distance1<distance3 && distance1<distance4){
           
        }
        else if(distance2<distance1&& distance2<distance3 && distance2<distance4){
            
        }
       else if(distance3<distance1 && distance3<distance2 && distance3<distance4){
       
        }
        else{
            
        }

        const distance = zim.dist(draggableMagnet.x + 120, draggableMagnet.y + 60, fixedMagnet.x, fixedMagnet.y);
        const angle = zim.angle(draggableMagnet.x, draggableMagnet.y, fixedMagnet.x, fixedMagnet.y); 

        if (distance < 600) {
            fixedMagnet.rot(angle);
            if (flipBtn.isOn) {
                draggableMagnetN.x = 120;
                fixedMagnetS.x = 0;
            } else {
                draggableMagnetN.x = 0;
                fixedMagnetS.x = 120;
            }
        }

    }

    draggableMagnet.on("pressmove", updateRotation);

    // Create the flip button
    const flipBtn = new Button(50, 50, "flip", "red", "grey").addTo(draggableMagnet);
    flipBtn.x = 90;
    flipBtn.y = 20;

    const flipMagnet = () => {
        draggableMagnet.animate({
            target: draggableMagnet,
            rotation: draggableMagnet.rotation + 180, 
            time: 500, 
            ease: "bounceOut"
        });

        // timeout(0.5, ()=> {
        //     fixedMagnet.animate({
        //         target: fixedMagnet,
        //         rotation: fixedMagnet.rotation + 180,
        //         time:.2,
        //         ease:"quadOut",
        //     });
        // });
       
        if (flipBtn.isOn) {

            
        } else {
           
        }
    };

 
    flipBtn.on("click", flipMagnet);

    // const outerRect =  new Container(400, 300).center();
    // fixedMagnet.addTo(outerRect);
     
    // if(draggableMagnet.hitTestRect(outerRect)){
        
    // }

});
