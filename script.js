const initslider = () =>{
    const imageList = document.querySelector(".slidder-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slidder-wrapper .slide-buttonn");
    const sliderScrollbar = document.querySelector(".containerslide .slide-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX; 
        const thumbPosition = scrollbarThumb.offsetLeft;

        //MOuse Over
        const handleMouseMove = (e) =>{
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition ));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition; 
        }
        
        //remove all mouse up stufd
        const handleMouseUp = () => {
            document.removeEventListener("mouseover", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        //drag interaction
        document.addEventListener("mouseover", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

    });

    // Slide Images
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    //Scroll Bar
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`; 
    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });
}

window.addEventListener("load", initslider);