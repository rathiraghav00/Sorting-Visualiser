import React from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSortAlgorithm";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSortAlgorithm";
import { getInsertionSortAnimations } from "../sortingAlgorithms/insertionSortAlgorithm";
import { getQuickSortAnimations } from "../sortingAlgorithms/quickSortAlgorithm";
import { getSelectionSortAnimations } from "../sortingAlgorithms/selectionSortAlgorithm";
import "./SortingVisualizer";
import Footer from "./Footer";

// Change this value for the speed of the animations.
var ANIMATION_SPEED_MS = 10;

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
      bars: (window.innerWidth - 20) / 5,
      maxHeight: window.innerHeight - 100,
    };
  }

  updateDimensions() {
    this.setState({
      bars: (window.innerWidth - 20) / 5,
      maxHeight: window.innerHeight - 100,
    });

    if (this.state.buttonClicked !== 0) {
      this.bruteReset();
    } else {
      this.resetArray();
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.updateDimensions();

    this.resetArray();
    this.setState({ buttonClicked: 0 });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  resetArray() {
    if (this.state.buttonClicked !== 0) return;

    this.setState({ buttonClicked: 1 });

    const arr = [];
    for (let i = 0; i < this.state.bars; i++) {
      arr.push(randomIntFromInterval(5, this.state.maxHeight));
    }

    this.setState({ array: arr, buttonClicked: 0 });
  }

  processAlgorithm(animations, id) {
    ANIMATION_SPEED_MS = 10000 / (animations.length + 1);

    this.setState({ buttonClicked: id });
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
          const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] =
            animations[i];
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
    if (this.state.buttonClicked !== 0) return;
    const animations = getBubbleSortAnimations([...this.state.array]);
    this.processAlgorithm(animations, dict["bubble"]);
  }

  insertionSort() {
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
    var id = window.setTimeout(function () {}, 0);

    while (id--) {
      window.clearTimeout(id);
    }

    this.setState(
      {
        array: [],
        buttonClicked: 0,
        bars: (window.innerWidth - 20) / 5,
        maxHeight: window.innerHeight - 100,
      },
      () => {
        // IMP
        this.resetArray();
      }
    );
  }

  render() {
    return (
      <div>
        <div className="up buttons">
          <div className="text-center">
            <button
              type="submit"
              className="form-control btn btn-link col-sm-1"
              style={{
                minWidth: "18ch",
                opacity:
                  this.state.buttonClicked === 0 ||
                  this.state.buttonClicked === dict["generate"]
                    ? 1
                    : 0.2,
                color: "black",
              }}
              onClick={() => this.resetArray()}
            >
              Generate New Array
            </button>
            <button
              type="submit"
              className="form-control btn btn-link col-sm-1"
              style={{
                minWidth: "18ch",
                opacity:
                  this.state.buttonClicked === 0 ||
                  this.state.buttonClicked === dict["merge"]
                    ? 1
                    : 0.2,
                color: "black",
              }}
              onClick={() => this.mergeSort()}
            >
              Merge Sort
            </button>
            <button
              type="submit"
              className="form-control btn btn-link col-sm-1"
              style={{
                minWidth: "18ch",
                fontSize: "15px",
                opacity:
                  this.state.buttonClicked === 0 ||
                  this.state.buttonClicked === dict["quick"]
                    ? 1
                    : 0.2,
                color: "black",
              }}
              onClick={() => this.quickSort()}
            >
              Quick Sort
            </button>
            <button
              type="submit"
              className="form-control btn btn-link col-sm-1"
              style={{
                minWidth: "18ch",
                opacity:
                  this.state.buttonClicked === 0 ||
                  this.state.buttonClicked === dict["bubble"]
                    ? 1
                    : 0.2,
                color: "black",
              }}
              onClick={() => this.bubbleSort()}
            >
              Bubble Sort
            </button>
            <button
              type="submit"
              className="form-control btn btn-link col-sm-1"
              style={{
                minWidth: "18ch",

                opacity:
                  this.state.buttonClicked === 0 ||
                  this.state.buttonClicked === dict["insertion"]
                    ? 1
                    : 0.2,
                color: "black",
              }}
              onClick={() => this.insertionSort()}
            >
              Insertion Sort
            </button>
            <button
              type="submit"
              className="form-control btn btn-link col-sm-1"
              style={{
                minWidth: "18ch",
                opacity:
                  this.state.buttonClicked === 0 ||
                  this.state.buttonClicked === dict["selection"]
                    ? 1
                    : 0.2,
                color: "black",
              }}
              onClick={() => this.selectionSort()}
            >
              Selection Sort
            </button>
            <button
              type="submit"
              className="form-control btn btn-link col-sm-1"
              style={{
                minWidth: "18ch",
                color: "red",
              }}
              onClick={() => this.bruteReset()}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="array-container">
          {this.state.array.map((value, idx) => (
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
        <Footer className="container" />
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
