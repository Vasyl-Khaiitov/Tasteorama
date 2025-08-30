import TextArea from "../TextArea/TextArea";

export default function InstructionsSection() {
  return (
    <>
      <h2>Instructions</h2>
      <TextArea
        name="instructions"
        placeholder="Describe the cooking process"
        rows="5"
      />
    </>
  );
}
