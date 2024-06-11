import useFormStore from '@/stores/applyCoachFormStore';

const StepThree: React.FC = () => {
  const { formData, prevStep } = useFormStore();

  const handleSubmit = () => {
    // 處理提交邏輯
    console.log('Submitted Data:', formData);
  };

  return (
    <div>
      <h2>Step Three</h2>
      <button onClick={prevStep}>Previous</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default StepThree;
