import {Card} from "@nextui-org/react";
import {Listbox, ListboxItem} from "@nextui-org/react";

function App() {
  return (
    <Card className="max-w-[400px]">
      <Listbox
        aria-label="Actions"
        onAction={(key) => alert(key)}
        itemClasses={{
          base: "data-[hover=true]:bg-primary-50",
        }}
      >
        <ListboxItem key="new" variant="shadow">New file</ListboxItem>
        <ListboxItem key="copy" variant="shadow">Copy link</ListboxItem>
        <ListboxItem key="edit" variant="shadow">Edit file</ListboxItem>
        <ListboxItem key="delete" variant="shadow">
          Delete file
        </ListboxItem>
      </Listbox>
    </Card>
  );
}

export default App;
