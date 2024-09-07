const isElementVisibleInContainer = (ele, container) => {
    if(!(ele && container)) return true
    const rect = ele.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    if(rect.top < containerRect.top) {
        console.log(rect.top)
        console.log(containerRect.top)
        console.log(rect.top > containerRect.top)
        return "above"
    }
    if(rect.bottom > containerRect.bottom) {
        return "under"
    }
    return "visible";
};

export default isElementVisibleInContainer