import PrimeWorker from "worker-loader!../workers/worker";

const worker = new PrimeWorker();

worker.postMessage({ limit: 1000 });
worker.onmessage = (event) => {
  console.log(event.data)
};
