import React, { useState, useRef, useEffect } from "react";
import { formatCost } from "../../utils/formatUtil";
import ItemImg from "../ItemImg";

// 강화 시뮬레이터를 만들어줘
export default function Simulator({
  reinforcementData,
  cronStonePrice,
  items,
}) {
  // 강화 시작 단계 선택 상태
  const [gradeStart, setGradeStart] = useState(0);
  // 현재 강화 단계
  const [currentGrade, setCurrentGrade] = useState(0);
  // 목표 강화 단계
  const [goalGrade, setGoalGrade] = useState(5); // Default 목표 단계: 동
  // 강화단계 리스트
  const grades = ["노강", "장", "광", "고", "유", "동"]; // 0단계부터 5단계까지 강화등급
  // 강화 결과를 저장할 상태
  const [simulationResults, setSimulationResults] = useState([]);
  // 지금까지 사용한 크론석 갯수
  const [totalCronStonesUsed, setTotalCronStonesUsed] = useState(0);
  // 강화 시도 횟수
  const [totalAttempts, setTotalAttempts] = useState(0);

  const resultsEndRef = useRef(null);

  useEffect(() => {
    if (resultsEndRef.current && simulationResults.length > 0) {
      resultsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [simulationResults]);

  // 강화 시작 단계 변경 핸들러
  const handleGradeStartChange = (e) => {
    setGradeStart(Number(e.target.value));
    setCurrentGrade(Number(e.target.value));
    setSimulationResults([]);
    setTotalCronStonesUsed(0);
    setTotalAttempts(0);
  };

  // 목표 강화 단계 변경 핸들러
  const handleGoalGradeChange = (e) => {
    setGoalGrade(Number(e.target.value));
  };

  // 강화 시뮬레이션 실행 핸들러
  const handleSimulate = () => {
    if (currentGrade >= grades.length - 1 || currentGrade >= goalGrade) return;

    let cronStonesUsed = totalCronStonesUsed;
    let simulationResult = [...simulationResults];

    const successProbability =
      reinforcementData.successProbability[currentGrade] / 100;
    const downgradeProbability =
      reinforcementData.gradeDecreaseProbability[currentGrade] / 100;
    const maintainProbability =
      reinforcementData.gradeMaintainProbability[currentGrade] / 100;
    const cronStones = reinforcementData.cronStones[currentGrade];

    const random = Math.random();

    if (random < successProbability) {
      simulationResult.push({
        stage: grades[currentGrade + 1],
        result: "성공",
        cronStonesUsed: cronStones,
      });
      setCurrentGrade(currentGrade + 1);
    } else if (random < successProbability + maintainProbability) {
      simulationResult.push({
        stage: grades[currentGrade + 1],
        result: "유지",
        cronStonesUsed: cronStones,
      });
    } else {
      simulationResult.push({
        stage: grades[currentGrade + 1],
        result: "하락",
        cronStonesUsed: cronStones,
      });
      setCurrentGrade(Math.max(0, currentGrade - 1));
    }

    cronStonesUsed += cronStones;
    setTotalCronStonesUsed(cronStonesUsed);
    setSimulationResults(simulationResult);
    setTotalAttempts(totalAttempts + 1);
  };

  // 강화 초기화 핸들러
  const handleReset = () => {
    setCurrentGrade(gradeStart);
    setSimulationResults([]);
    setTotalCronStonesUsed(0);
    setTotalAttempts(0);
  };

  return (
    <>
      <div className="col-span-2 row-span-1 bg-white p-4 shadow-md rounded-lg">
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">강화 시뮬레이터</h1>
          <div className="mb-4">
            <label htmlFor="gradeStart" className="block text-lg font-semibold">
              강화 시작 단계:
            </label>
            <select
              id="gradeStart"
              value={gradeStart}
              onChange={handleGradeStartChange}
              className="border p-2 rounded w-full"
            >
              {grades.map((grade, index) => (
                <option key={index} value={index}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="goalGrade" className="block text-lg font-semibold">
              목표 강화 단계:
            </label>
            <select
              id="goalGrade"
              value={goalGrade}
              onChange={handleGoalGradeChange}
              className="border p-2 rounded w-full"
            >
              {grades.map((grade, index) => (
                <option key={index} value={index}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 p-4 border rounded-lg bg-gray-100 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-2">
              현재 강화 단계: {grades[currentGrade]}
            </h2>
            {reinforcementData && (
              <div className="mb-2">
                <ItemImg item={items[currentGrade]} className="rounded-xl" />
              </div>
            )}
            <p>
              강화 성공 확률:{" "}
              <span className="font-semibold">
                {reinforcementData.successProbability[currentGrade]}%
              </span>
            </p>
            <p>
              강화 실패시 등급 유지 확률:{" "}
              <span className="font-semibold">
                {reinforcementData.gradeMaintainProbability[currentGrade]}%
              </span>
            </p>
            <p>
              강화 실패시 등급 하락 확률:{" "}
              <span className="font-semibold">
                {reinforcementData.gradeDecreaseProbability[currentGrade]}%
              </span>
            </p>
            <p>
              크론석 소모 갯수:{" "}
              <span className="font-semibold">
                {reinforcementData.cronStones[currentGrade]}
              </span>
            </p>
          </div>
          {/*  초기화 버튼 크기를 제외하고 나머지 크기를 강화 버튼이 꽉채우기*/}
          <div className="flex">
            <button
              onClick={handleSimulate}
              disabled={currentGrade >= goalGrade}
              className={`bg-[rgb(72,187,120)] font-bold text-white text-lg py-2 px-4 rounded-lg mb-4 flex-grow`}
            >
              강화
            </button>
            <button
              onClick={handleReset}
              className="bg-red-500 text-white text-lg font-semibold py-2 px-4 rounded-lg mb-4 w-20 ml-2"
            >
              초기화
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-1 row-span-1 bg-white p-4 shadow-md rounded-lg">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">시뮬레이션 결과</h2>
          <p className="text-base">
            사용된 크론석 갯수: {totalCronStonesUsed}개
          </p>
          <p className="text-base">
            사용된 크론석 비용:{" "}
            {formatCost(totalCronStonesUsed * cronStonePrice)}
          </p>
          <p className="text-base">시도한 횟수: {totalAttempts}</p>
          <div className="overflow-y-auto h-96 border border-gray-500 bg-gray-200 rounded-lg mt-3">
            <ul className="p-4 text-black list-none">
              {simulationResults.map((result, index) => (
                <li
                  key={index}
                  className={`mb-2 ${
                    result.result === "성공"
                      ? "text-green-500"
                      : result.result === "유지"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {result.stage} 트라이: {result.result} (소모된 크론석:{" "}
                  {result.cronStonesUsed})
                </li>
              ))}
              <div ref={resultsEndRef} />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
