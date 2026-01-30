import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Edit2, MoreHorizontal, Calendar, Building2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchCompanyByText) {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter((company) =>
        company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>
          A list of your recently registered companies
        </TableCaption>

        <TableHeader className="bg-gray-50 dark:bg-gray-900/50">
          <TableRow>
            <TableHead className="font-bold text-gray-900 dark:text-white rounded-tl-2xl">Company</TableHead>
            <TableHead className="font-bold text-gray-900 dark:text-white">Date Registered</TableHead>
            <TableHead className="text-right font-bold text-gray-900 dark:text-white rounded-tr-2xl px-6">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* ===== ENHANCED EMPTY STATE ===== */}
          {filteredCompanies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="py-20 text-center">
                <div className="flex flex-col items-center justify-center max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-gray-200 dark:border-gray-700">
                    <MoreHorizontal className="text-gray-300 dark:text-gray-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Companies Registered</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                    To start hiring, you first need to register your company. Once registered, you can setup your profile and start posting job opportunities.
                  </p>
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                      <span className="w-6 h-6 flex items-center justify-center bg-[#6A38C2] text-white rounded-full text-[10px] font-bold">1</span>
                      <span>Click <strong>"New Company"</strong> above</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                      <span className="w-6 h-6 flex items-center justify-center bg-[#6A38C2] text-white rounded-full text-[10px] font-bold">2</span>
                      <span>Setup company profile & details</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                      <span className="w-6 h-6 flex items-center justify-center bg-[#6A38C2] text-white rounded-full text-[10px] font-bold">3</span>
                      <span>Start posting your first job!</span>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filteredCompanies.map((company) => (
              <TableRow key={company._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                {/* COMPANY INFO */}
                <TableCell className="py-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 border-2 border-gray-100 dark:border-gray-700">
                      <AvatarImage src={company.logo} />
                      <AvatarFallback className="bg-[#6A38C2]/10 text-[#6A38C2] font-bold">
                        {company?.name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white leading-none mb-1">{company.name}</p>
                      <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                        <Building2 size={12} /> Organizational Profile
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* DATE */}
                <TableCell>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                    <Calendar size={16} className="text-[#6A38C2]/50" />
                    {company?.createdAt
                      ? company.createdAt.split("T")[0]
                      : "-"}
                  </div>
                </TableCell>

                {/* ACTION */}
                <TableCell className="text-right px-6">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 rounded-2xl p-2 shadow-2xl border-gray-100 dark:border-gray-700">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 font-semibold transition-all group"
                      >
                        <Edit2 className="w-4 text-[#6A38C2] group-hover:scale-110" />
                        <span>Manage Details</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
