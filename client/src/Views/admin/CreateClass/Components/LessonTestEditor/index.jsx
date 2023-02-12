import { Button, Input, TextField } from "@mui/material";
import React from "react";
import { DragAndDropQuizes } from "../DragAndDropQuizes";
import { Textarea } from "@mui/joy";
import { DoneIcon, TrashIcon } from "../../../../../Icons/Admin";

const LessonTestEditor = ({
  lesson: { lesson },
  addQuizeToLesson,
  dragAndDropquizes,
  handleDuplicateQuize,
  handleDeleteQuize,
  changeEditableQuize,
}) => {
  const [selectedQuize, setSelectedQuize] = React.useState();
  const [isOpenAddAnwser, setIsOpenAddAnswer] = React.useState(false);
  const [answer, setAnswer] = React.useState("");
  React.useEffect(() => {
    setSelectedQuize(null);
  }, [lesson.slug]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedQuize({
      ...selectedQuize,
      [name]: value,
    });
    changeEditableQuize(selectedQuize.slug, name, value);
  };

  const handleAddAnswer = () => {
    setSelectedQuize({
      ...selectedQuize,
      answers: [...selectedQuize.answers, answer],
    });
    setAnswer("");
    setIsOpenAddAnswer(false);
    changeEditableQuize(selectedQuize.slug, "answers", [
      ...selectedQuize.answers,
      answer,
    ]);
  };

  const handleCancelAnswer = () => {
    setAnswer("");
    setIsOpenAddAnswer(false);
  };

  const handleSelectAnswer = (e) => {
    setSelectedQuize({
      ...selectedQuize,
      answerIndex: e,
    });
    changeEditableQuize(selectedQuize.slug, "answerIndex", e);
  };

  const trashAnswer = (index) => {
    const newQuizeAnswers = selectedQuize.answers.filter((e, i) => i !== index);
    setSelectedQuize({
      ...selectedQuize,
      answers: newQuizeAnswers,
      answerIndex:
        index === selectedQuize.answerIndex
          ? null
          : selectedQuize.answerIndex - 1,
    });
    changeEditableQuize(
      selectedQuize.slug,
      "trashAnswer",
      index === selectedQuize.answerIndex
        ? null
        : selectedQuize.answerIndex - 1,
      newQuizeAnswers
    );
  };

  return (
    <div className="flex gap-6">
      <div className="min-w-[330px] flex flex-col gap-5">
        <div className="text-xl border-b-2 border-gray-200 pb-4">
          Quizes for selected Lesson
        </div>
        <DragAndDropQuizes
          setEditableQuize={(quize) => setSelectedQuize(quize)}
          quizes={lesson.quizes}
          deleteQuize={(...props) => {
            handleDeleteQuize(...props);
            setSelectedQuize(null);
          }}
          duplicateQuize={handleDuplicateQuize}
          changeQuizes={(newLessons) => dragAndDropquizes(newLessons)}
        />
        <Button color="success" variant="outlined" onClick={addQuizeToLesson}>
          Add New Quize
        </Button>
      </div>
      {selectedQuize ? (
        <div className="mt-20 ml-10 w-4/5 flex flex-col gap-2">
          <TextField
            value={selectedQuize.title}
            onChange={handleInputChange}
            name="title"
            inputProps={{ maxLength: 30 }}
            label="Quize Title"
          />
          <Textarea
            value={selectedQuize.description}
            name="description"
            onChange={handleInputChange}
            placeholder="Enter quize description"
          />
          <div className="mt-4">Answers</div>
          {selectedQuize.answers.map((e, index) => {
            return (
              <div
                key={e}
                style={{
                  borderColor:
                    index === selectedQuize.answerIndex ? "#03C988" : "",
                  borderRadius: "12px",
                }}
                onClick={() => handleSelectAnswer(index)}
                className={`w-full flex justify-between items-center py-2 px-4 border-[1px] cursor-pointer border-${
                  index === selectedQuize.answerIndex
                    ? "indigo-200"
                    : "indigo-300"
                }`}
              >
                <div className="text-xl">{e}</div>
                <TrashIcon
                  onClick={(e) => {
                    trashAnswer(index);
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />
              </div>
            );
          })}
          {isOpenAddAnwser ? (
            <div className="flex gap-2 mt-10 w-full">
              <TextField
                value={answer}
                className="w-full"
                onChange={(e) => setAnswer(e.target.value)}
                name="answer"
                size="small"
                inputProps={{ maxLength: 30 }}
                label="Answer"
              />
              <Button
                color="success"
                onClick={() => handleAddAnswer()}
                variant="contained"
              >
                Save
              </Button>
              <Button
                color="success"
                onClick={() => handleCancelAnswer()}
                variant="outlined"
              >
                Close
              </Button>
            </div>
          ) : (
            <div className="mt-10 w-full">
              <Button
                color="success"
                variant="outlined"
                style={{ width: "100%" }}
                onClick={() => setIsOpenAddAnswer(true)}
              >
                Add New Answer
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-20 ml-10 w-5/5 flex flex-col gap-2">
          <div className="text-xl">Select Quize or Create</div>
        </div>
      )}
    </div>
  );
};

export default LessonTestEditor;
