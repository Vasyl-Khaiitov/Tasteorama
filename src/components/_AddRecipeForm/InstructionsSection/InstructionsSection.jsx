import TextArea from "../TextArea/TextArea";

export default function InstructionsSection() {
  return (
    <TextArea
      name="instructions"
      labelText="Instructions"
      placeholder="Describe the cooking process"
      rows="5"
    />
  );
}
