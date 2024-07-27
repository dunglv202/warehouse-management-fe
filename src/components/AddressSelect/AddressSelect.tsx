import { Address } from '@/models/common'
import { Division } from '@/models/division'
import { getDistricts, getProvinces, getWards } from '@/services/division-service'
import { filterIgnoreVietnameseTones } from '@/utils/search-utils'
import { Col, Form, Input, Row, Select } from 'antd'
import { ChangeEvent, useEffect, useState } from 'react'

interface AddressSelectProps {
  required?: boolean
  onChange: (address: Address) => void
}

interface DivisionSelectProps {
  onChange: (id: number) => void
  options: Division[]
  value?: number
  disabled?: boolean
}

const DivisionSelect = ({ value, options, onChange, disabled }: DivisionSelectProps) => {
  return (
    <Select
      value={value}
      options={options.map((o) => ({ label: o.name, value: o.id }))}
      onChange={onChange}
      showSearch
      filterOption={filterIgnoreVietnameseTones}
      disabled={disabled}
    />
  )
}

const AddressSelect = ({ required, onChange }: AddressSelectProps) => {
  const [address, setAddress] = useState<Partial<Address>>()
  const [provinces, setProvinces] = useState<Division[]>([])
  const [districts, setDistricts] = useState<Division[]>([])
  const [wards, setWards] = useState<Division[]>([])

  useEffect(() => {
    const fetch = async () => {
      setProvinces(await getProvinces())
    }
    fetch()
  }, [])

  const handleProvinceChange = async (provinceId: number) => {
    const addr = { provinceId }
    setAddress(addr)
    setDistricts(await getDistricts(provinceId))
    onChange(addr as Address)
  }

  const handleDistrictChange = async (districtId: number) => {
    const addr = { provinceId: address?.provinceId, districtId }
    setAddress(addr)
    setWards(await getWards(districtId))
    onChange(addr as Address)
  }

  const handleWardChange = async (wardId: number) => {
    const addr = { ...address, wardId }
    setAddress(addr)
    onChange(addr as Address)
  }

  const handleStreetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const addr = { ...address, street: e?.target?.value }
    setAddress(addr)
    onChange(addr as Address)
  }

  return (
    <Row gutter={20}>
      <Col span={24} lg={{ span: 8 }}>
        <Form.Item label='Province' required={required}>
          <DivisionSelect
            options={provinces}
            value={address?.provinceId}
            onChange={handleProvinceChange}
          />
        </Form.Item>
      </Col>
      <Col span={24} lg={{ span: 8 }}>
        <Form.Item label='District'>
          <DivisionSelect
            options={districts}
            value={address?.districtId}
            onChange={handleDistrictChange}
            disabled={!address?.provinceId}
          />
        </Form.Item>
      </Col>
      <Col span={24} lg={{ span: 8 }}>
        <Form.Item label='Ward'>
          <DivisionSelect
            options={wards}
            value={address?.wardId}
            onChange={handleWardChange}
            disabled={!address?.districtId}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label='Street' style={{ marginBottom: 0 }}>
          <Input onChange={handleStreetChange} disabled={!address?.districtId} />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default AddressSelect
