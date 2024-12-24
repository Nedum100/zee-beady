interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

export function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          trend === 'up' ? 'bg-green-50' : 'bg-red-50'
        }`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {description}
        </span>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-600 mt-1">{title}</p>
      </div>
    </div>
  );
}
