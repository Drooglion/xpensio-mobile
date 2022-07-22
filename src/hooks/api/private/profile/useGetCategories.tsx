import { useQuery } from 'react-query';

import useApi from 'hooks/useApi';
import Category from 'models/Category';
import { ICategoriesResponse } from 'types/Category';

const useGetCategories = () => {
  const { api } = useApi();

  const fetchCategories = async () => {
    try {
      const res = await api.get('settings/categories');
      let categories: Category[] = [];
      const response = res.data as ICategoriesResponse;
      response.payload.forEach(i => {
        categories.push(new Category(i));
      });
      return categories.sort((a, b) => a.name.localeCompare(b.name));
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return useQuery('categories', fetchCategories);
};

export default useGetCategories;
