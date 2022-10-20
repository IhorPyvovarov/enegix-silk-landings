window.addEventListener('DOMContentLoaded', () => {
    function moveText() {
        const DEFAULT_TEXT_OFFSET = 160
        const currentScrolled = document.documentElement.scrollTop
        const firstSentence = document.querySelector('.moving-text p:first-of-type')
        const secondSentence = document.querySelector('.moving-text p:nth-of-type(2)')
        const lastSentence = document.querySelector('.moving-text p:last-of-type')

        const currentTextOffset = DEFAULT_TEXT_OFFSET - currentScrolled
        firstSentence.style.transform = `translateX(${currentTextOffset}px)`
        secondSentence.style.transform = `translateX(${-1 * currentTextOffset/2}px)`
        lastSentence.style.transform = `translateX(${-1 * currentTextOffset}px)`
    }

    function getPhoneWrapperPosition(percent=0) {
        let translateY = -10
        let scale = 1.2
        let rotate = -7
        if (percent) {
            translateY = translateY - translateY * percent / 100
            scale = scale - (scale - 1) * percent / 100
            rotate = rotate - rotate * percent / 100
        }
        return `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`
    }
    function getFinalPosition() {
        return "translateY(0px) rotate(0deg) scale(1)"
    }

    function animatePhone() {
        const currentScrolled = document.documentElement.scrollTop
        const currentScrolledWithHeight = currentScrolled + window.innerHeight
        const phoneBlock = document.querySelector("[data-wrapper=phone]")
        const offsetPhoneBlock = phoneBlock.offsetTop

        if (currentScrolledWithHeight > offsetPhoneBlock) {
            const offsetToMiddlePhoneBlock = offsetPhoneBlock + phoneBlock.clientHeight / 1.5
            if (currentScrolledWithHeight < offsetToMiddlePhoneBlock) {
                const percentScrolledOnPhone = (currentScrolledWithHeight - offsetPhoneBlock) * 100 / (offsetToMiddlePhoneBlock - offsetPhoneBlock)
                phoneBlock.style.transform = getPhoneWrapperPosition(percentScrolledOnPhone)
            } else {
                phoneBlock.style.transform = getFinalPosition()
            }
        } else {
            phoneBlock.style.transform = getPhoneWrapperPosition()
        }
    }
    function animations() {
        moveText()
        animatePhone()
    }

    animations()
    window.addEventListener('scroll', animations)
    document.addEventListener('load', animations)
    window.addEventListener('resize', animations)
});