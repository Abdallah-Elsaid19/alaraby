// components/StatsSection.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faUserDoctor, faUserGroup, faScalpel, faHospital } from "@fortawesome/free-solid-svg-icons";

export default function StatsSection() {
  const stats = [
    { id: 1, value: 268, label: "Bed", icon: faBed },
    { id: 2, value: 116, label: "Consultant", icon: faUserDoctor },
    { id: 3, value: 32000, label: "Surgery", icon: faHospital },
    { id: 4, value: 416, label: "Medical Staff", icon: faUserGroup },
  ];

  return (
    <section className="w-full bg-[#00a9b5] dark:bg-zinc-900 text-white ">
      <div className="grid grid-cols-2 md:grid-cols-4 text-center  ">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col items-center justify-center  border-r last:border-r-0 border-white/30 hover:bg-[#1A606A] transition py-15 "
          >
            <div className="flex items-center justify-center mb-2 space-x-2">
              <span className="text-3xl md:text-4xl font-bold">{stat.value}</span>
              <FontAwesomeIcon icon={stat.icon} className="w-8 h-8" />
            </div>
            <p className="text-sm md:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
