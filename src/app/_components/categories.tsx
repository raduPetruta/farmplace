// components/Categories.js

import { db } from "~/server/db";
import { postsTable, usersTable } from "~/server/db/schema";

export const Categories = async () => {
    const categories = [
      { name: 'Vehicles', icon: '🚗' },
      { name: 'Phones', icon: '📱' },
      { name: 'Electronics', icon: '💻' },
      { name: 'Home Appliances', icon: '🏠' },
      { name: 'Fashion', icon: '👗' },
      { name: 'Toys', icon: '🧸' },
      { name: 'Furniture', icon: '🛋️' },
      { name: 'Pets', icon: '🐕' },
    ];

    const users = await db.select().from(usersTable).all();
  
    return (
      <div className="flex justify-center flex-wrap gap-6 mt-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-gray-100 text-[#003338] shadow-md cursor-pointer"
          >
            <span className="text-3xl">{category.icon}</span>
            <span className="mt-2 text-sm text-center">{category.name}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default Categories;
  