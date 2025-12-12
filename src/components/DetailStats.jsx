export default function DetailStats({ label, value }) {
  return (
    <div className="bg-[hsl(240,10%,15%)] p-3 md:p-4 rounded-xl text-center text-white">
      <p className="text-sm md:text-base text-[hsl(0,0%,70%)] font-[DM Sans]">{label}</p>
      <p className="text-lg md:text-xl font-[BricolageGrotesque] font-semibold mt-1">{value}</p>
    </div>
  );
}
