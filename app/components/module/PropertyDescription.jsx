import React, { useState, useRef, useEffect } from "react";
import { Typography, Button } from "antd";
import ReactMarkdown from 'react-markdown'
const PropertyDescription = ({ description }) => {
  const { Paragraph } = Typography;
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const paragraphRef = useRef(null);

  useEffect(() => {
    if (paragraphRef.current) {
        const { scrollHeight, offsetHeight } = paragraphRef.current;
      const isOverflowing =
       scrollHeight > offsetHeight;
      setShowButton(isOverflowing);
      console.log( scrollHeight > offsetHeight);
    }
    
  }, [description]);

  if (!description) return null;

  return (
    <>
      <h2 className="gradient_title inline" >About this property</h2>

        
     
      <article className="prose max-w-prose">
        <Paragraph
          ref={paragraphRef}
          ellipsis={
            !expanded
              ? {
                rows: 5,
                expandable: false,
              }
              : false
          }
          >
          <ReactMarkdown>
          {description}
      </ReactMarkdown>
        </Paragraph>
      </article>
      {showButton && (
        <Button
          style={{ padding: 0 }}
          type="link"
          onClick={() => setExpanded(!expanded)}
        >    
          {expanded ? "Show less" : "Show more"}
        </Button>
      )}
    </>
  );
};

export default PropertyDescription;
