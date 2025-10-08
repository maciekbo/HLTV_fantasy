(function() {
    const IFRAME_SELECTOR = 'iframe.allstargg-iframe';
    
    function removeParentOfIframe() {
        const iframeToRemove = document.querySelector(IFRAME_SELECTOR);

        if (iframeToRemove) {
            const parentNode = iframeToRemove.parentNode;
            const grandparentNode = parentNode ? parentNode.parentNode : null;

            // Ensure both the parent and a grandparent exist before removing
            if (parentNode && grandparentNode) {
                grandparentNode.removeChild(parentNode);
                console.log("Parent of iframe.allstargg-iframe has been removed.");
            } else if (parentNode) {
                // If only a parent exists (e.g., if the iframe is a direct child of <body>)
                parentNode.removeChild(iframeToRemove); 
            }
        }
    }
    
    // Execute the removal function immediately
    removeParentOfIframe(); 

    // Use a MutationObserver to catch iframes and containers added dynamically later
    const observerConfig = { childList: true, subtree: true };
    const observer = new MutationObserver((mutationsList, observer) => {
        observer.disconnect(); // Disconnect to prevent re-triggering during removal
        removeParentOfIframe(); 
        observer.observe(document.body, observerConfig);
    });

    if (document.body) {
        observer.observe(document.body, observerConfig);
    } else {
        window.addEventListener('load', () => {
            observer.observe(document.body, observerConfig);
        });
    }

})();