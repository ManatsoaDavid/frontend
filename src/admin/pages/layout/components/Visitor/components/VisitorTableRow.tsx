import React from 'react';
import { motion } from 'framer-motion';
import { IvisitorWithUser } from 'shared/models/visitor.model';

interface VisitorTableRowProps {
  visitor: IvisitorWithUser;
}

const VisitorTableRow: React.FC<VisitorTableRowProps> = ({ visitor }) => (
  <motion.tr
    whileHover={{ backgroundColor: "#f9fafb" }}
    className="hover:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] transition-all duration-300"
  >
    <td className="px-6 py-4 whitespace-nowrap">{visitor.user.name} {visitor.user.firstName}</td>
    <td className="px-6 py-4 whitespace-nowrap">{visitor.user.email}</td>
    <td className="px-6 py-4 whitespace-nowrap">{visitor.user.contact}</td>
  </motion.tr>
);


export default VisitorTableRow;
