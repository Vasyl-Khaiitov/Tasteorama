import TextArea from "../TextArea/TextArea";

export default function InstructionsSection() {
  return (
    <>
      <TextArea
        name="instructions"
        placeholder="Describe the cooking process"
        rows="5"
      />
    </>
  );
}
