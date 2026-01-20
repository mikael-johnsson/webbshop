

/**
 * 
 * Makes the right sidebar sticky on desktop while scrolling
 * @description 
 * Disabled on mobile (screens 768px and below).
 * Works around SCSS conflict with animation (transform)/ and sticky. 
 * Attaches scroll and resize event listeners to maintain sticky behavoiur .
 * 
 */
export const makeRightSideSticky = () => {
    const rightSide = document.querySelector('.right') as HTMLElement;
    const main = document.querySelector('main') as HTMLElement;
    
    if (!rightSide || !main) return;
    
    let isStuck = false;
    
    window.addEventListener('scroll', () => {
        if(window.innerWidth <= 768) {
            if(isStuck) {
                rightSide.style.position ="";
                rightSide.style.top = "";
                rightSide.style.left ="";
                rightSide.style.width ="";
                isStuck = false
            }
            return
        }
      const mainTop = main.getBoundingClientRect().top;
      const rightRect = rightSide.getBoundingClientRect();
      
      // If we scrolled past the top
      if (mainTop <= 20 && !isStuck) {
        isStuck = true;
        rightSide.style.position = 'fixed';
        rightSide.style.top = '20px';
        rightSide.style.left = rightRect.left + 'px';
        rightSide.style.width = rightRect.width + 'px';
      }
      
      // If we scrolled back up
      if (mainTop > 20 && isStuck) {
        isStuck = false;
        rightSide.style.position = '';
        rightSide.style.top = '';
        rightSide.style.left = '';
        rightSide.style.width = '';
      }
    });
    
    // Update position on window resize
    window.addEventListener('resize', () => {
      if (isStuck) {
        const rightRect = rightSide.getBoundingClientRect();
        rightSide.style.left = rightRect.left + 'px';
        rightSide.style.width = rightRect.width + 'px';
      }
    });
  };


   
