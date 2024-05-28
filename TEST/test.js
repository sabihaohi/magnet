import zim from "https://zimjs.org/cdn/016/zim";

const { Frame, Container, Rectangle, Label } = zim;

const frame = new Frame("fit", 1920, 1080, "#ddd");
frame.on("ready", ()=>{

    // fixed magnet
    const fixedMagnet = new Container(240, 60).center();
    const fixedMagnetN = new Rectangle(120, 60, "red");
    const fixedMagnetS = new Rectangle(120, 60, "blue");
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
    const draggableMagnet = new Container(240, 60).center().mov(-500,0);

    const draggableMagnetN = new Rectangle(120, 60, "red");
    const draggableMagnetS = new Rectangle(120, 60, "blue");
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
    draggableMagnet.drag({all:true})

    const updateRotation = () => {

      
        const distance = zim.dist(draggableMagnet.x+120, draggableMagnet.y+60, fixedMagnet.x, fixedMagnet.y);
        const angle = zim.angle(draggableMagnet.x, draggableMagnet.y, fixedMagnet.x, fixedMagnet.y);

        console.log(distance, angle);

        if(distance < 600) {
            fixedMagnet.rot(angle);
           
        }

    }

    // const calculateNSPointDistance = ()=>{
    

    //     const distance2 = zim.dist(fixedMagnetN.x + fixedMagnet.x, fixedMagnetN.y + fixedMagnet.y, draggableMagnetN.x + draggableMagnet.x, draggableMagnetN.y + draggableMagnet.y);
    //     console.log("Distance between fixedMagnetN and draggableMagnetN:", distance2);

    //     const distance = zim.dist(draggableMagnet.x + 120, draggableMagnet.y + 60, fixedMagnet.x, fixedMagnet.y);
    //     const angle = zim.angle(draggableMagnet.x, draggableMagnet.y, fixedMagnet.x, fixedMagnet.y);
    // }

    draggableMagnet.on("pressmove", updateRotation)
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
     };
 
     flipBtn.on("click", flipMagnet);





});