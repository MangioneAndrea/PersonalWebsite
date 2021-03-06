
window.onscroll = () => {

}

const callbacks = new Map();

const onIntersect = (entries) => {
    entries.forEach(({ isIntersecting, target: { id } }) => {
        const props = callbacks.get(id);
        if (isIntersecting) {
            props.onIntersectionStart && props.onIntersectionStart();
        } else {
            props.onIntersectionEnd && props.onIntersectionEnd();
        }
    })
}
const observer = new IntersectionObserver(onIntersect,{threshold: 0.05});

export const addObservable = (nodeId, { onIntersectionStart, onIntersectionEnd } = {}) => {
    const node = document.querySelector(`#${nodeId}`)
    try {
        observer.observe(node);
        callbacks.set(nodeId, { onIntersectionStart, onIntersectionEnd });
    } catch (e) {
        console.error(e)
    }
}
export const useObservable = (nodeId, props) => {
    return () => addObservable(nodeId, props)
}
export const removeObservable = (nodeId) => {
    observer && node && observer.unobserve(node);
    callbacks.set(nodeId, undefined);
}

export const scrollTo = (nodeId) => {
    const { top } = document.querySelector(`#${nodeId}`).getBoundingClientRect();
    window.scroll({
        top,
        behavior: 'smooth'
    })
}