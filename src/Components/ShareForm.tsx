import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

export default function ShareForm(props: { formID: number }) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="flex">
      <label>Shareable Link</label>
      <CopyToClipboard
        text={`localhost:3000/form/${props.formID}`}
        onCopy={onCopy}
      >
        <button>Copy</button>
      </CopyToClipboard>
      {copied && <span>Copied!</span>}
    </div>
  );
}
