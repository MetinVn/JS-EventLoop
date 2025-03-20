import eventloop from "../images/event-loop-crp.png";

const About = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900">About This Project</h1>
      <p className="text-lg text-gray-700 mb-6">
        This application provides a dynamic visualization of the JavaScript event loop. By enabling users to drag and drop events to adjust
        their call order, the app illustrates how both synchronous and asynchronous operations are processed. This offers valuable insights
        into JavaScript's concurrency model and task scheduling.
      </p>

      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Usage Guide</h2>
      <ul className="list-disc list-inside space-y-3 mb-6 text-lg text-gray-700">
        <li>
          <span className="font-medium">Reorder Events:</span> Use the drag-and-drop functionality to rearrange the events’ displayed order.
        </li>
        <li>
          <span className="font-medium">Execute Events:</span> Click the <em>Run</em> button to trigger the execution sequence.
        </li>
        <li>
          <span className="font-medium">View Logs:</span> Observe the log output, which details the actual execution sequence—this may
          differ from the visual order.
        </li>
        <li>
          <span className="font-medium">Understand Event Loop Processing:</span>
          <br />
          Synchronous functions will run in the exact order you specify. However, asynchronous operations are ultimately managed by the
          JavaScript event loop’s scheduling algorithm, which may cause them to execute at different times than their displayed order
          suggests.
        </li>
      </ul>

      <p className="text-lg text-gray-700 mb-4">
        <strong>Note:</strong> While you can reorder events visually, asynchronous tasks still depend on the event loop’s internal
        scheduling to determine their final execution.
      </p>

      <p className="text-lg text-gray-700">
        Explore and experiment with the tool to gain a deeper understanding of how JavaScript prioritizes and processes tasks.
      </p>

      <img src={eventloop} alt="event-loop" className="w-full h-full object-center object-contain mt-6" />
    </div>
  );
};

export default About;
