import React from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSortAlgorithm.js";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSortAlgorithm.js";
import { getInsertionSortAnimations } from "../sortingAlgorithms/insertionSortAlgorithm.js";
import { getQuickSortAnimations } from "../sortingAlgorithms/quickSortAlgorithm.js";
import { getSelectionSortAnimations } from "../sortingAlgorithms/selectionSortAlgorithm.js";
import "./SortingVisualizer.css";

// Change this value for the speed of the animations.
var ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

var dict = {
  generate: 1,
  merge: 2,
  quick: 3,
  bubble: 4,
  insertion: 5,
  selection: 6,
  reset: 7,
};

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      buttonClicked: 0,
    };

    // this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.resetArray();
    this.setState({ buttonClicked: 0 });
  }

  resetArray() {
    if (this.state.buttonClicked !== 0) return;
    this.setState({ buttonClicked: 1 });
    const arr = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      arr.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array: arr });
    this.setState({ buttonClicked: 0 });
  }

  processAlgorithm(animations, id) {
    ANIMATION_SPEED_MS = 10000 / (animations.length + 1);

    this.setState({ buttonClicked: id });
    console.log("SET TO TRUE");
    var tim = 0;
    var cnt = 0;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = Boolean(animations[i].length === 2);
      if (isColorChange) {
        cnt++;
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = cnt % 2 === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
        tim = i * ANIMATION_SPEED_MS;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        tim = i * ANIMATION_SPEED_MS;
        setTimeout(() => {
          const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] = animations[
            i
          ];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeightOne}px`;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barTwoStyle.height = `${newHeightTwo}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => {
      var sorted_arr = [...this.state.array].sort(function (a, b) {
        return a - b;
      });
      this.setState({ array: sorted_arr });
      this.setState({ buttonClicked: 0 });
      console.log("SET TO FALSE");
    }, tim);
  }

  mergeSort() {
    if (this.state.buttonClicked !== 0) return;
    const animations = getMergeSortAnimations([...this.state.array]);
    this.processAlgorithm(animations, dict["merge"]);
  }

  quickSort() {
    if (this.state.buttonClicked !== 0) return;
    const animations = getQuickSortAnimations([...this.state.array]);
    this.processAlgorithm(animations, dict["quick"]);
  }

  bubbleSort() {
    // console.log("Inside Bubble Sort");
    if (this.state.buttonClicked !== 0) return;
    const animations = getBubbleSortAnimations([...this.state.array]);
    this.processAlgorithm(animations, dict["bubble"]);
  }

  insertionSort() {
    // console.log("Inside Insertion Sort");
    if (this.state.buttonClicked !== 0) return;
    const animations = getInsertionSortAnimations([...this.state.array]);
    this.processAlgorithm(animations, dict["insertion"]);
  }

  selectionSort() {
    if (this.state.buttonClicked !== 0) return;
    const animations = getSelectionSortAnimations([...this.state.array]);
    this.processAlgorithm(animations, dict["selection"]);
  }

  bruteReset() {
    window.location.reload();
  }

  render() {
    const { array } = this.state;

    return (
      <div>
        <div className="up">
          <div class="col-sm-12 text-center">
            <button
              type="submit"
              style={{
                opacity:
                  this.state.buttonClicked === 0 ||
                  this.state.buttonClicked === dict["generate"]
                    ? 1
                    : 0.5,
                color: "black",
              }}
              className="form-control btn btn-link col-md-1"
              onClick={() => this.resetArray()}
            >
              Generate New Array
            </button>
            <button
              type="submit"
              style={{
                opacity:
                  this.state.buttonClicked === 0 ||
                  this.state.buttonClicked === dict["merge"]
                    ? 1
                    : 0.5,
                color: "black",
              }}
              className="form-control btn btn-link  col-md-1"
              onClick={() => this.mergeSort()}
            >
              Merge Sort
            </button>
            <button
              type="submit"
              style={{
                opacity:
                  this.state.buttonClicked === 0 ||
                  this.state.buttonClicked === dict["quick"]
                    ? 1
                    : 0.5,
                color: "black",
              }}
              className="form-control btn btn-link  col-md-1"
              onClick={() => this.quickSort()}
            >
              Quick Sort
            </button>
            <button
              type="submit"
              style={{
                opacity:
                  this.state.buttonClicked === 0 ||
                  this.state.buttonClicked === dict["bubble"]
                    ? 1
                    : 0.5,
                color: "black",
              }}
              className="form-control btn btn-link  col-md-1"
              onClick={() => this.bubbleSort()}
            >
              Bubble Sort
            </button>
            <button
              type="submit"
              style={{
                opacity:
                  this.state.buttonClicked === 0 ||
                  this.state.buttonClicked === dict["insertion"]
                    ? 1
                    : 0.5,
                color: "black",
              }}
              className="form-control btn btn-link  col-md-1"
              onClick={() => this.insertionSort()}
            >
              Insertion Sort
            </button>
            <button
              type="submit"
              style={{
                opacity:
                  this.state.buttonClicked === 0 ||
                  this.state.buttonClicked === dict["selection"]
                    ? 1
                    : 0.5,
                color: "black",
              }}
              className="form-control btn btn-link  col-md-1"
              onClick={() => this.selectionSort()}
            >
              Selection Sort
            </button>
            <button
              type="submit"
              style={{
                color: "red",
              }}
              className="form-control btn btn-link  col-md-1"
              onClick={() => this.bruteReset()}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="array-container down">
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
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
