import React from 'react';
import ContentLoader from "react-content-loader";

function LoadingBlock() {
    return (
        <ContentLoader
            className="pizza-block"
            speed={2}
            width={280}
            height={460}
            viewBox="0 0 280 460"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="129" cy="127" r="120" /> 
            <rect x="0" y="309" rx="6" ry="6" width="280" height="84" /> 
            <rect x="0" y="268" rx="6" ry="6" width="280" height="28" /> 
            <rect x="0" y="410" rx="6" ry="6" width="90" height="34" /> 
            <rect x="119" y="403" rx="14" ry="14" width="158" height="46"/>
        </ContentLoader>
    )
}

export default LoadingBlock;
