import React from 'react';
import {Accordion, AccordionItem, Link} from "@nextui-org/react";

function App() {
  return (
    <Accordion>
      <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
        <li>
          <Link href="#">Default Link</Link>
        </li>
        <li>
          <Link href="#">Default Link</Link>
        </li>
        <li>
          <Link href="#">Default Link</Link>
        </li>
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
        <Link href="#">Default Link</Link>
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
        <Link href="#">Default Link</Link>
      </AccordionItem>
    </Accordion>
  );
}

export default App;
