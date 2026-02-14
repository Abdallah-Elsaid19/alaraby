export default function Stepper({ currentStep }) {
  const steps = [
    "Specialty",
    "Date & Time",
    "Basic Information",
  ];

  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col justify-center items-between">
          
          {/* الدائرة */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
              index < currentStep
                ? "bg-secondary  text-white"
                : index === currentStep
                ? "bg-white secondary"
                : "bg-gray-100 border-gray-300 text-gray-400"
            }`}
          >
            {index + 1}
          </div>

          {/* الخط بين الخطوات */}
          {index !== steps.length - 1 && (
            <div
              className={`flex-1 h-1 w-1 mx-2 ${
                index < currentStep ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
          )}
          <div className="text-xs mt-2">{step}</div>
        </div>
        
      ))}
      
    </div>
  );
}
