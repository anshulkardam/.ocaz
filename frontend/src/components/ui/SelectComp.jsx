export const SelectComp= ({label}) => {
return <form className="w-[101px] text-black">
  <label className="block text-sm font-medium text-gray-900 dark:text-white">{label}</label>
  <select id="small" defaultValue="" className="block w-full p-1 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option value="" disabled>Choose</option>
    <option value="US">United States</option>
    <option value="CA">Canada</option>
    <option value="FR">France</option>
    <option value="DE">Germany</option>
  </select>
</form>
}