import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DuplicateIcon, TrashIcon } from "../../../../../Icons/Admin";

export const DragAndDropQuizes = ({
  quizes,
  changeQuizes,
  setEditableQuize,
  deleteQuize,
  duplicateQuize,
}) => {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    width: "100%",
    cursor: "pointer",
    justifyContent: "space-between",
    aligItems: "center",
    padding: "12px 0px",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    width: "100%",
  });
  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      quizes,
      result.source.index,
      result.destination.index
    );

    changeQuizes(items);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {quizes.map((item, index) => (
              <Draggable key={item.slug} draggableId={item.slug} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                    onClick={() => setEditableQuize(item)}
                    className="width-1/1 gap-2 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex flex-col gap-1"
                        {...provided.dragHandleProps}
                      >
                        <div className="w-[20px] h-[1px] bg-black"></div>
                        <div className="w-[20px] h-[1px] bg-black"></div>
                        <div className="w-[20px] h-[1px] bg-black"></div>
                      </div>
                      <span
                        className="text-1xl"
                        style={{ color: item.title ? "#000" : "gray" }}
                      >
                        {item.title || "Quize Name"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <DuplicateIcon
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          duplicateQuize(item.slug);
                        }}
                      />
                      <TrashIcon
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteQuize(item.slug);
                        }}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
