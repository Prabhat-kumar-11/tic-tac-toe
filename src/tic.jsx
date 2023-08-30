import { Box, Button, Center } from "@chakra-ui/react";
import React, { useState } from "react";

export const Tic = () => {
  const [nextTurn, setNextTurn] = useState(false);
  const [winner, setWinner] = useState("");
  const [boxes, setBoxes] = useState(new Array(9).fill(null));

  const handleBoxClick = (index) => {
    if (boxes[index] != null || hasAWinner(boxes)) return;
    const squares = [...boxes];
    squares[index] = nextTurn ? "O" : "X";
    setBoxes(squares);

    const isWinner = hasAWinner(squares);

    if (isWinner) {
      setWinner(nextTurn ? "O" : "X");
    }
    setNextTurn((prev) => !prev);
  };

  const hasAWinner = (squares) => {
    let arr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of arr) {
      if (squares[a] && squares[b] && squares[c]) {
        if (squares[a] == squares[b] && squares[b] == squares[c]) {
          return true;
        }
      }
    }
    return false;
  };

  const handleReset = () => {
    setWinner("");
    setBoxes(new Array(9).fill(null));
    setNextTurn(false);
  };
  return (
    <Center  flexDirection="column">
      <Box mt={4} fontSize="xl">
        Next Turn: {nextTurn ? "O" : "X"}
      </Box>
      <Box mt={4} display="grid" gridTemplateColumns="repeat(3, 100px)" gap={1}>
        {boxes.map((box, index) => (
          <Box
            key={index}
            onClick={() => handleBoxClick(index)}
            width="100px"
            height="100px"
            border="1px solid black"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="2xl"
          >
            {box}
          </Box>
        ))}
      </Box>
      <Button bgColor={"blue.800"} color={"aqua"} mt={4} onClick={handleReset}>
        Reset
      </Button>
      {winner && (
        <Box mt={4} fontSize="2xl">
          {winner} is Winner
        </Box>
      )}
    </Center>
  );
};
