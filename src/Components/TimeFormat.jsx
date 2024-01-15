
import { format } from 'date-fns';

const TimeFormat = ({ withdrawal }) => {
  const formattedDate = format(new Date(withdrawal.createdAt), 'yyyy-MM-dd HH:mm:ss');

  return (
    <tr>
      {/* Other table cells */}
      <td className="p-2 border">
        {formattedDate}
      </td>
      {/* Other table cells */}
    </tr>
  );
};

export default TimeFormat;
