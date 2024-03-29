package com.greenart.mapper;

import java.util.List;

import com.greenart.vo.CoronaAgeInfoVO;
import com.greenart.vo.CoronaInfoVO;
import com.greenart.vo.CoronaSidoInfoVO;
import com.greenart.vo.CoronaVaccineInfoVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CoronaInfoMapper {
    public void insertCoronaInfo(CoronaInfoVO vo);
    public CoronaInfoVO selectCoronaInfoByDate(String date);
    public void insertCoronaSidoInfo(CoronaSidoInfoVO vo);
    public List<CoronaSidoInfoVO> selectCoronaSidoInfo(String date);
    public void insertCoronaAge(CoronaAgeInfoVO vo);
    public List<CoronaAgeInfoVO> selectCoronaAgeInfo(String date);
    public List<CoronaAgeInfoVO> selectCoronaGenInfo(String date);
    public void insertCoronaVaccineInfo(CoronaVaccineInfoVO vo);
    public List<CoronaVaccineInfoVO> selectCoronaVaccineInfo(String date);

}
