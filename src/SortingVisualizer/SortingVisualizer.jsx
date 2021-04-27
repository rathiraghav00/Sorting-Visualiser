import React from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSortAlgorithm.js";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSortAlgorithm.js";
import { getInsertionSortAnimations } from "../sortingAlgorithms/insertionSortAlgorithm.js";
import { getQuickSortAnimations } from "../sortingAlgorithms/quickSortAlgorithm.js";
import { getSelectionSortAnimations } from "../sortingAlgorithms/selectionSortAlgorithm.js";
import "./SortingVisualizer.css";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 300;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
    console.log("Size of array", NUMBER_OF_ARRAY_BARS);
  }

  processAlgorithm(animations) {
    var cnt = 0;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = Boolean(animations[i].length === 2);
      if (isColorChange) {
        cnt++;
        console.log("2 wali condiition");
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = cnt % 2 === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] = animations[
            i
          ];
          console.log("4 wali condiition");
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeightOne}px`;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barTwoStyle.height = `${newHeightTwo}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  mergeSort() {
    console.log("Inside Merge Sort");
    const animations = getMergeSortAnimations(this.state.array);
    this.processAlgorithm(animations);
  }

  quickSort() {
    console.log("Inside Quick Sort");
    const animations = getQuickSortAnimations(this.state.array);
    this.processAlgorithm(animations);
  }

  bubbleSort() {
    console.log("Inside Bubble Sort");
    const animations = getBubbleSortAnimations(this.state.array);
    this.processAlgorithm(animations);
  }

  insertionSort() {
    console.log("Inside Insertion Sort");
    const animations = getInsertionSortAnimations(this.state.array);
    this.processAlgorithm(animations);
  }

  selectionSort() {
    console.log("Inside Selection Sort");
    const animations = getSelectionSortAnimations(this.state.array);
    this.processAlgorithm(animations);
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
        <button onClick={() => this.selectionSort()}>Selection Sort</button>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
