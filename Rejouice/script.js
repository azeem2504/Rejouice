function scroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
function cursorEffect(){
    var page1Cont = document.querySelector("#page1-content")
var cursor = document.querySelector("#cursor")

page1Cont.addEventListener("mousemove",function(dets) {
    gsap.to(cursor,{
        x: dets.x,
        y: dets.y
    })
})
page1Cont.addEventListener("mouseenter",function(){
    gsap.to(cursor,{
        scale: 1,
        // opacity: 1
    })
})
page1Cont.addEventListener("mouseleave",function(){
    gsap.to(cursor,{
        scale: 0,
        // opacity: 0
    })
})
}
function hidDiv(){
    var menu = document.querySelector("#menu")
var hid = document.querySelector("#hid-div")
var close = document.querySelector("#close")
menu.addEventListener("click",function(){
    hid.style.top = 0
})

close.addEventListener("click",function(){
    hid.style.top = "-100%"
})
}

cursorEffect()
scroll()
hidDiv()

var hidvid = document.querySelector("#hid-video")
var menu = document.querySelector("#menu")
var close = document.querySelector("#close")

menu.addEventListener("click",function(){
    gsap.to(hidvid,{
        scale: 1
    })
})
close.addEventListener("click",function(){
    gsap.to(hidvid,{
        scale: 0
    })
})






