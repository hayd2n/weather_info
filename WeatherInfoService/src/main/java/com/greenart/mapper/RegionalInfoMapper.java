package com.greenart.mapper;

import java.util.List;

import com.greenart.vo.CoronaInfoVO;
import com.greenart.vo.CoronaSidoInfoVO;
import com.greenart.vo.CoronaVaccineInfoVO;
import com.greenart.vo.CoronaVaccineWeeksVO;
import com.greenart.vo.CoronaWeeksVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RegionalInfoMapper {
    public CoronaSidoInfoVO selectRegionalCoronaInfo(String region, String date);
    public CoronaInfoVO selectCoronaInfoRegionTotal(String date);
    public CoronaVaccineInfoVO selectCoronaVaccineInfo(String region, String date);
    public String selectDangerAge(String date);
    public List<CoronaWeeksVO> selectRegionalCoronaTwoWeeks(String region, String date);
    public List<CoronaVaccineWeeksVO> selectRegionalCoronaVaccineTwoWeeks(String region, String date);
}
